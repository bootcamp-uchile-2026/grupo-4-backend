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
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsCarritoModule } from './items-carrito/items-carrito.module';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module';
import { EstadoPedidosModule } from './estado-pedidos/estado-pedidos.module';
import { HistorialPedidosModule } from './historial-pedidos/historial-pedidos.module';
import { DatosDespachoModule } from './datos-despacho/datos-despacho.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';
import { MetodosEntregaModule } from './metodos-entrega/metodos-entrega.module';
import { RegistroModule } from './registro/registro.module';
import { RecuperacionPasswordModule } from './recuperacion-password/recuperacion-password.module';
import { VerificacionCorreoModule } from './verificacion-correo/verificacion-correo.module';
import { DespachosModule } from './despachos/despachos.module';
import { TiemposEntregaModule } from './tiempos-entrega/tiempos-entrega.module';
import { SeguimientosDespachoModule } from './seguimientos-despacho/seguimientos-despacho.module';
import { ZonasDespachoModule } from './zonas-despacho/zonas-despacho.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RegistroModule, RecuperacionPasswordModule, VerificacionCorreoModule, DespachosModule, TiemposEntregaModule, SeguimientosDespachoModule, ZonasDespachoModule,
    ProductosModule, CategoriasModule, DireccionesModule, UsuariosModule, ProveedoresModule, SuscripcionesModule, ResenasModule, CarritoModule, StockModule, PedidosModule, ItemsCarritoModule, DetallePedidosModule, EstadoPedidosModule, HistorialPedidosModule, DatosDespachoModule, MetodosPagoModule, MetodosEntregaModule],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
    .apply(RequestIdMiddleware)
    .forRoutes('*');
  }
}
