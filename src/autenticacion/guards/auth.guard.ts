import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { RolUsuario } from '../../usuarios/enums/rol-usuario.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  role: RolUsuario;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Header Authorization requerido');
    }

    const parts = authorization.trim().split(/\s+/);

    if (parts[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'Esquema de autenticación inválido. Se requiere Bearer',
      );
    }

    if (parts.length === 1) {
      throw new UnauthorizedException('Token de acceso requerido');
    }

    if (parts.length !== 2) {
      throw new UnauthorizedException(
        'Formato del encabezado Authorization inválido',
      );
    }

    const token = parts[1];

    try {
      request.user = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token de acceso expirado');
      }

      throw new UnauthorizedException('Token de acceso inválido');
    }

    return true;
  }
}
