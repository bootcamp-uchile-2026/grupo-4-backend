import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';
import { ResenasModule } from './resenas/resenas.module';
import { CarritoModule } from './carrito/carrito.module';
import { StockModule } from './stock/stock.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [ProductosModule, CategoriasModule, DireccionesModule, UsuariosModule, ProveedoresModule, SuscripcionesModule, ResenasModule, CarritoModule, StockModule, PedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
