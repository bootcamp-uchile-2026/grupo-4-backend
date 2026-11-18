import { SuscripcionUsuario } from './entities/suscripcion-usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { SuscripcionProducto } from './entities/suscripcion-producto.entity';
import { Module } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesController } from './suscripciones.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SuscripcionProducto,
      SuscripcionUsuario,
      Suscripcion,
    ]),
  ],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService],
})
export class SuscripcionesModule {}
