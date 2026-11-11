import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { TokenRecuperacion } from './entities/token-recuperacion.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecuperacionPasswordController } from './recuperacion-password.controller';
import { RecuperacionPasswordService } from './recuperacion-password.service';

@Module({
  imports: [
    UsuariosModule,
    TypeOrmModule.forFeature([Usuario, TokenRecuperacion]),
  ],
  controllers: [RecuperacionPasswordController],
  providers: [RecuperacionPasswordService],
})
export class RecuperacionPasswordModule {}
