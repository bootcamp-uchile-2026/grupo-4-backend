
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginAutenticacionDto } from './dto/login-autenticacion.dto';

@Injectable()
export class AutenticacionService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginAutenticacionDto) {
    const usuario = await this.usuariosRepository.findOneBy({
      email: dto.email,
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordValida = await argon2.verify(
      usuario.password_hash,
      dto.password,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.rol,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
