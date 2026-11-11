import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguimientoDespacho } from './entities/seguimiento-despacho.entity';
import { Module } from '@nestjs/common';
import { SeguimientosDespachoController } from './seguimientos-despacho.controller';
import { SeguimientosDespachoService } from './seguimientos-despacho.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeguimientoDespacho])],
  controllers: [SeguimientosDespachoController],
  providers: [SeguimientosDespachoService],
})
export class SeguimientosDespachoModule {}
