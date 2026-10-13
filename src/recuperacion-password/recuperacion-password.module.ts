import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecuperacionPasswordController } from './recuperacion-password.controller';
import { RecuperacionPasswordService } from './recuperacion-password.service';

@Module({
  imports: [UsuariosModule],
  controllers: [RecuperacionPasswordController],
  providers: [RecuperacionPasswordService],
})
export class RecuperacionPasswordModule {}
