
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AutenticacionService } from './autenticacion.service';
import { LoginAutenticacionDto } from './dto/login-autenticacion.dto';

@ApiTags('Autenticación')
@Controller('autenticacion')
export class AutenticacionController {
  constructor(
    private readonly autenticacionService: AutenticacionService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión correcto. Devuelve un JWT.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas.',
  })
  login(@Body() dto: LoginAutenticacionDto) {
    return this.autenticacionService.login(dto);
  }
}
