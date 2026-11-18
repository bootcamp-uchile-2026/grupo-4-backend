import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'node:path';

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
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { RolesModule } from './roles/roles.module';
import { ArchivosModule } from './archivos/archivos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME ?? 'lasobremesa',
      autoLoadEntities: true,
      synchronize: false,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        fallthrough: false,
      },
    }),

    RegistroModule,
    AutenticacionModule,
    RecuperacionPasswordModule,
    VerificacionCorreoModule,
    DespachosModule,
    TiemposEntregaModule,
    SeguimientosDespachoModule,
    ZonasDespachoModule,
    ProductosModule,
    CategoriasModule,
    DireccionesModule,
    UsuariosModule,
    ProveedoresModule,
    SuscripcionesModule,
    ResenasModule,
    CarritoModule,
    StockModule,
    PedidosModule,
    ItemsCarritoModule,
    DetallePedidosModule,
    EstadoPedidosModule,
    HistorialPedidosModule,
    DatosDespachoModule,
    MetodosPagoModule,
    MetodosEntregaModule,
    RolesModule,
    ArchivosModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
