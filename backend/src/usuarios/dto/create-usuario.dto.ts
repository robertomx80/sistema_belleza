import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @IsInt({ message: 'El rol debe ser un número entero' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  rolId: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
