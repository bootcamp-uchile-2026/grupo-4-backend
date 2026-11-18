import { Module } from '@nestjs/common';
import { DatosDespachoService } from './datos-despacho.service';
import { DatosDespachoController } from './datos-despacho.controller';

@Module({
  controllers: [],
  providers: [DatosDespachoService],
})
export class DatosDespachoModule {}
