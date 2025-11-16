import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUsuarioDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        email: createUsuarioDto.email,
        passwordHash: hashedPassword,
        rolId: createUsuarioDto.rolId,
        activo: createUsuarioDto.activo ?? true,
      },
      include: {
        rol: true,
      },
    });

    const { passwordHash, ...result } = usuario;
    return result;
  }

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany({
      include: {
        rol: true,
        empleado: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
        cliente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
          },
        },
      },
    });

    return usuarios.map(({ passwordHash, ...usuario }) => usuario);
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        rol: true,
        empleado: true,
        cliente: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const { passwordHash, ...result } = usuario;
    return result;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id); // Verificar que existe

    const updateData: any = { ...updateUsuarioDto };

    // Si se actualiza la contraseña, hashearla
    if (updateUsuarioDto.password) {
      updateData.passwordHash = await bcrypt.hash(updateUsuarioDto.password, 10);
      delete updateData.password;
    }

    const usuario = await this.prisma.usuario.update({
      where: { id },
      data: updateData,
      include: {
        rol: true,
      },
    });

    const { passwordHash, ...result } = usuario;
    return result;
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar que existe

    // Desactivar en lugar de eliminar (soft delete)
    const usuario = await this.prisma.usuario.update({
      where: { id },
      data: { activo: false },
    });

    const { passwordHash, ...result } = usuario;
    return result;
  }
}
