import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';

@Module({
  imports: [UsuariosModule],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule {}
