import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { Proveedor } from './entities/proveedor.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { Imagen } from '../archivos/entities/imagen.entity';
import { ArchivosModule } from '../archivos/archivos.module';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedor, Usuario, Rol, Imagen]),
    ArchivosModule,
    AutenticacionModule,
  ],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
