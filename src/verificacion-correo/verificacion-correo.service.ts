import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ConfirmarVerificacionDto } from './dto/confirmar-verificacion.dto';
import { SolicitarVerificacionDto } from './dto/solicitar-verificacion.dto';
import { VerificacionCorreo } from './entities/verificacion-correo.entity';

const HORAS_DE_VALIDEZ = 24;

@Injectable()
export class VerificacionCorreoService {
  private verificaciones: VerificacionCorreo[] = [];

  constructor(private readonly usuariosService: UsuariosService) {
    // dato de ejemplo: el primer usuario de prueba parte con su correo verificado
    this.verificaciones.push(
      new VerificacionCorreo(
        randomUUID(),
        'camilo@example.com',
        randomUUID(),
        new Date(),
        true,
      ),
    );
  }

  solicitar(solicitarVerificacionDto: SolicitarVerificacionDto) {
    const email = solicitarVerificacionDto.email;
    this.buscarUsuario(email);

    const actual = this.verificaciones.find((v) => v.email === email);
    if (actual && actual.verificado) {
      throw new ConflictException('El correo ya está verificado.');
    }

    // si había una verificación pendiente, se reemplaza por la nueva
    this.verificaciones = this.verificaciones.filter((v) => v.email !== email);

    const expiraEn = new Date(Date.now() + HORAS_DE_VALIDEZ * 60 * 60 * 1000);
    const verificacion = new VerificacionCorreo(
      randomUUID(),
      email,
      randomUUID(),
      expiraEn,
      false,
    );
    this.verificaciones.push(verificacion);
    return verificacion;
  }

  confirmar(confirmarVerificacionDto: ConfirmarVerificacionDto) {
    const verificacion = this.verificaciones.find(
      (v) => v.token === confirmarVerificacionDto.token,
    );
    if (!verificacion) {
      throw new NotFoundException('El token no es válido.');
    }
    if (verificacion.verificado) {
      throw new ConflictException('El correo ya está verificado.');
    }
    if (verificacion.expiraEn < new Date()) {
      throw new BadRequestException('El token expiró.');
    }

    verificacion.verificado = true;
    return { email: verificacion.email, verificado: true };
  }

  estado(email: string) {
    this.buscarUsuario(email);

    let verificado = false;
    const verificacion = this.verificaciones.find((v) => v.email === email);
    if (verificacion) {
      verificado = verificacion.verificado;
    }
    return { email: email, verificado: verificado };
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
