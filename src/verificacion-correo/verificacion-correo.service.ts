import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { SolicitarVerificacionDto } from './dto/solicitar-verificacion.dto';
import { ConfirmarVerificacionDto } from './dto/confirmar-verificacion.dto';

@Injectable()
export class VerificacionCorreoService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
  ) {}
  async estado(email: string) {
    const usuario = await this.usuarios.findOneBy({ email });
    if (!usuario)
      throw new NotFoundException('No existe un usuario con ese email.');
    return { email, verificado: usuario.email_verificado };
  }
  async solicitar(_dto: SolicitarVerificacionDto): Promise<never> {
    // El esquema SQL no contempla persistencia de tokens de verificación.
    throw new NotImplementedException(
      'Falta definir el mecanismo de tokens de verificación en el modelo Database First.',
    );
  }
  async confirmar(_dto: ConfirmarVerificacionDto): Promise<never> {
    throw new NotImplementedException(
      'No existe una tabla para validar tokens de verificación en el modelo Database First.',
    );
  }
}
