import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { createHash, randomUUID } from 'crypto';
import * as argon2 from 'argon2';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { TokenRecuperacion } from './entities/token-recuperacion.entity';
import { ConfirmarRecuperacionDto } from './dto/confirmar-recuperacion.dto';
import { SolicitarRecuperacionDto } from './dto/solicitar-recuperacion.dto';

@Injectable()
export class RecuperacionPasswordService {
  constructor(
    @InjectRepository(TokenRecuperacion)
    private readonly tokens: Repository<TokenRecuperacion>,

    @InjectRepository(Usuario)
    private readonly usuarios: Repository<Usuario>,
  ) {}

  private hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async solicitar(dto: SolicitarRecuperacionDto) {
    const usuario = await this.usuarios.findOneBy({
      email: dto.email,
    });

    if (!usuario) {
      throw new NotFoundException('No existe un usuario con ese email.');
    }

    const token = randomUUID();
    const expiraEn = new Date(Date.now() + 15 * 60_000);

    await this.tokens.update(
      {
        usuario_id: usuario.id,
        usado_en: IsNull(),
      },
      {
        usado_en: new Date(),
      },
    );

    const creado = await this.tokens.save(
      this.tokens.create({
        usuario_id: usuario.id,
        token_hash: this.hash(token),
        expira_en: expiraEn,
      }),
    );

    return {
      id: String(creado.id),
      email: usuario.email,
      token,
      expiraEn,
      usada: false,
    };
  }

  async confirmar(dto: ConfirmarRecuperacionDto) {
    const passwordHash = await argon2.hash(dto.nuevaPassword, {
      type: argon2.argon2id,
    });

    await this.tokens.manager.transaction(async (manager) => {
      const tokensRepo = manager.getRepository(TokenRecuperacion);
      const usuariosRepo = manager.getRepository(Usuario);

      const token = await tokensRepo.findOne({
        where: {
          token_hash: this.hash(dto.token),
        },
        lock: {
          mode: 'pessimistic_write',
        },
      });

      if (!token) {
        throw new NotFoundException('El token no es válido.');
      }

      if (token.usado_en) {
        throw new BadRequestException('El token ya fue utilizado.');
      }

      if (token.expira_en < new Date()) {
        throw new BadRequestException('El token expiró.');
      }

      const usuario = await usuariosRepo.findOneBy({
        id: token.usuario_id,
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      usuario.password_hash = passwordHash;
      await usuariosRepo.save(usuario);

      token.usado_en = new Date();
      await tokensRepo.save(token);
    });

    return {
      mensaje: 'Contraseña actualizada correctamente.',
    };
  }
}
