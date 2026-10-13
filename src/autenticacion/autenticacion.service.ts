import { Injectable } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { LoginAutenticacionDto } from './dto/login-autenticacion.dto';
import { UsuarioResponseDto } from '../usuarios/dto/usuarios-response.dto';

@Injectable()
export class AutenticacionService {
  registro(
    createAutenticacionDto: CreateAutenticacionDto,
  ): UsuarioResponseDto {
    return {
      id: '1',
      nombre: createAutenticacionDto.nombre,
      apellido: createAutenticacionDto.apellido,
      email: createAutenticacionDto.email,
      telefono: createAutenticacionDto.telefono,
    };
  }

  login(
    loginAutenticacionDto: LoginAutenticacionDto,
  ): { mensaje: string } {
    return {
      mensaje: 'Inicio de sesión simulado correctamente',
    };
  }
}
