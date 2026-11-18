import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ROLES_KEY } from '../decorators/roles.decorator';
import type { AuthenticatedRequest } from './auth.guard';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const usuario = await this.usuariosRepository.findOne({
      where: { id: user.sub },
      relations: { rol: true },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!usuario.rol) {
      throw new ForbiddenException('El usuario no tiene un rol asignado');
    }

    // Actualizar el rol del request con el valor actual de la base de datos.
    request.user = {
      ...user,
      role: usuario.rol.nombre,
    };

    if (!requiredRoles.includes(usuario.rol.nombre)) {
      throw new ForbiddenException('No tienes permisos para acceder');
    }

    return true;
  }
}
