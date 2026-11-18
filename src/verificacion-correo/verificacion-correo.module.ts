import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { VerificacionCorreoController } from './verificacion-correo.controller';
import { VerificacionCorreoService } from './verificacion-correo.service';

@Module({
  imports: [UsuariosModule, TypeOrmModule.forFeature([Usuario])],
  controllers: [VerificacionCorreoController],
  providers: [VerificacionCorreoService],
})
export class VerificacionCorreoModule {}
