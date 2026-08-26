import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { SuscripcionesModule } from './suscripciones/suscripciones.module';

@Module({
  imports: [ProductosModule, CategoriasModule, DireccionesModule, UsuariosModule, ProveedoresModule, SuscripcionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
