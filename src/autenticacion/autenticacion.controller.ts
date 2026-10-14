import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { LoginAutenticacionDto } from './dto/login-autenticacion.dto';
import { UsuarioResponseDto } from '../usuarios/dto/usuarios-response.dto';

@ApiTags('Autenticación')
@Controller('autenticacion')
export class AutenticacionController {
  constructor(
    private readonly autenticacionService: AutenticacionService,
  ) {}

  @Post('registro')
  @ApiOperation({
    summary: 'Simular el registro de un usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Registro simulado correctamente',
    type: UsuarioResponseDto,
  })
  registro(
    @Body() createAutenticacionDto: CreateAutenticacionDto,
  ): UsuarioResponseDto {
    return this.autenticacionService.registro(
      createAutenticacionDto,
    );
  }

  @Post('login')
  @ApiOperation({
    summary: 'Simular el inicio de sesión',
  })
  @ApiResponse({
    status: 201,
    description: 'Inicio de sesión simulado correctamente',
  })
  login(
    @Body() loginAutenticacionDto: LoginAutenticacionDto,
  ): { mensaje: string } {
    return this.autenticacionService.login(loginAutenticacionDto);
  }
}
