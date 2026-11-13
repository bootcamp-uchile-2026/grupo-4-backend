import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Producto } from './entities/producto.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Proveedor]),
    AutenticacionModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}