import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Iniciar sesión
   * @param loginDto - Credenciales de inicio de sesión
   * @returns Token de acceso y datos del usuario
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Registrar nuevo usuario
   * @param registerDto - Datos de registro
   * @returns Token de acceso y datos del usuario
   */
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Obtener perfil del usuario autenticado
   * @param user - Usuario actual extraído del token JWT
   * @returns Datos del perfil del usuario
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }

  /**
   * Verificar si el token es válido
   * @returns Estado de validez del token
   */
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@CurrentUser() user: any) {
    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}
