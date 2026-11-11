import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Module } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { DireccionesController } from './direcciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Direccion])],
  controllers: [DireccionesController],
  providers: [DireccionesService],
})
export class DireccionesModule {}
