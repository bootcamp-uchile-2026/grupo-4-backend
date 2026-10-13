import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { RequestIdMiddleware } from './common/middleware/request-id/request-id.middleware';
import { ConfigModule } from '@nestjs/config';
import { ItemsCarritoModule } from './items-carrito/items-carrito.module';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module';
import { EstadoPedidosModule } from './estado-pedidos/estado-pedidos.module';
import { HistorialPedidosModule } from './historial-pedidos/historial-pedidos.module';
import { DatosDespachoModule } from './datos-despacho/datos-despacho.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';
import { MetodosEntregaModule } from './metodos-entrega/metodos-entrega.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductosModule, CategoriasModule, DireccionesModule, UsuariosModule, ProveedoresModule, SuscripcionesModule, ResenasModule, CarritoModule, StockModule, PedidosModule, ItemsCarritoModule, DetallePedidosModule, EstadoPedidosModule, HistorialPedidosModule, DatosDespachoModule, MetodosPagoModule, MetodosEntregaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
    .apply(RequestIdMiddleware)
    .forRoutes('*');
  }
}
