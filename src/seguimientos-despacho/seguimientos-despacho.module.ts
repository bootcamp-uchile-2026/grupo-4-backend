import { Module } from '@nestjs/common';
import { SeguimientosDespachoController } from './seguimientos-despacho.controller';
import { SeguimientosDespachoService } from './seguimientos-despacho.service';

@Module({
  controllers: [SeguimientosDespachoController],
  providers: [SeguimientosDespachoService],
})
export class SeguimientosDespachoModule {}
