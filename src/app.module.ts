import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DireccionesModule } from './direcciones/direcciones.module';

@Module({
  imports: [ProductosModule, CategoriasModule, DireccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
