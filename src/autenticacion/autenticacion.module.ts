import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.getOrThrow<string>('JWT_SECRET');

        if (Buffer.byteLength(secret, 'utf8') < 32) {
          throw new Error('JWT_SECRET debe tener al menos 32 bytes');
        }

        return {
          secret,
          signOptions: {
            expiresIn: '2h',
            algorithm: 'HS256',
          },
          verifyOptions: {
            algorithms: ['HS256'],
          },
        };
      },
    }),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, AuthGuard, RolesGuard],
  exports: [AuthGuard, RolesGuard, JwtModule, TypeOrmModule],
})
export class AutenticacionModule {}
