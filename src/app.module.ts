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
import { FavoritosModule } from './favoritos/favoritos.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { CheckoutModule } from './checkout/checkout.module';
import { DatosFacturacionModule } from './datos-facturacion/datos-facturacion.module';
import { ConfirmacionCompraModule } from './confirmacion-compra/confirmacion-compra.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductosModule, CategoriasModule, DireccionesModule, UsuariosModule, ProveedoresModule, SuscripcionesModule, ResenasModule, CarritoModule, StockModule, PedidosModule, FavoritosModule, TarjetasModule, AutenticacionModule, CheckoutModule, DatosFacturacionModule, ConfirmacionCompraModule],
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
