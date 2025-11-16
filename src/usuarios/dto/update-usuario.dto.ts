import { IsEmail, IsString, MinLength, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password?: string;

  @IsInt({ message: 'El rol debe ser un número entero' })
  @IsOptional()
  rolId?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
