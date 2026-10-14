import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegistroDto } from './dto/registro.dto';

@Injectable()
export class RegistroService {
  constructor(private readonly usuariosService: UsuariosService) {}

  registrar(registroDto: RegistroDto) {
    if (registroDto.password !== registroDto.confirmarPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }

    return this.usuariosService.create({
      nombre: registroDto.nombre,
      apellido: registroDto.apellido,
      email: registroDto.email,
      telefono: registroDto.telefono,
      password: registroDto.password,
    });
  }
}
