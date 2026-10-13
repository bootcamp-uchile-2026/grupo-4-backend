import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { VerificacionCorreoController } from './verificacion-correo.controller';
import { VerificacionCorreoService } from './verificacion-correo.service';

@Module({
  imports: [UsuariosModule],
  controllers: [VerificacionCorreoController],
  providers: [VerificacionCorreoService],
})
export class VerificacionCorreoModule {}
