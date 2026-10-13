import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ConfirmarRecuperacionDto } from './dto/confirmar-recuperacion.dto';
import { SolicitarRecuperacionDto } from './dto/solicitar-recuperacion.dto';
import { SolicitudRecuperacion } from './entities/solicitud-recuperacion.entity';

const MINUTOS_DE_VALIDEZ = 15;

@Injectable()
export class RecuperacionPasswordService {
  private solicitudes: SolicitudRecuperacion[] = [];

  constructor(private readonly usuariosService: UsuariosService) {}

  solicitar(solicitarRecuperacionDto: SolicitarRecuperacionDto) {
    this.buscarUsuario(solicitarRecuperacionDto.email);

    // las solicitudes anteriores de ese email dejan de servir
    for (const anterior of this.solicitudes) {
      if (anterior.email === solicitarRecuperacionDto.email) {
        anterior.usada = true;
      }
    }

    const expiraEn = new Date(Date.now() + MINUTOS_DE_VALIDEZ * 60 * 1000);
    const solicitud = new SolicitudRecuperacion(
      randomUUID(),
      solicitarRecuperacionDto.email,
      randomUUID(),
      expiraEn,
      false,
    );
    this.solicitudes.push(solicitud);
    return solicitud;
  }

  confirmar(confirmarRecuperacionDto: ConfirmarRecuperacionDto) {
    const solicitud = this.solicitudes.find(
      (s) => s.token === confirmarRecuperacionDto.token,
    );
    if (!solicitud) {
      throw new NotFoundException('El token no es válido.');
    }
    if (solicitud.usada) {
      throw new BadRequestException('El token ya no es válido.');
    }
    if (solicitud.expiraEn < new Date()) {
      throw new BadRequestException('El token expiró.');
    }

    const usuario = this.buscarUsuario(solicitud.email);
    this.usuariosService.update(usuario.id, {
      password: confirmarRecuperacionDto.nuevaPassword,
    });
    solicitud.usada = true;

    return { mensaje: 'Contraseña actualizada correctamente.' };
  }

  private buscarUsuario(email: string) {
    const usuario = this.usuariosService
      .findAll()
      .find((u) => u.email === email);
    if (!usuario) {
      throw new NotFoundException('No existe un usuario con ese email.');
    }
    return usuario;
  }
}
