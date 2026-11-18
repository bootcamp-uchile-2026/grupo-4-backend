import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Producto } from './entities/producto.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Imagen } from '../archivos/entities/imagen.entity';
import { ArchivosModule } from '../archivos/archivos.module';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Proveedor, Imagen]),
    AutenticacionModule,
    ArchivosModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
