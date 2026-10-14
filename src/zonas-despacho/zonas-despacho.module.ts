import { Module } from '@nestjs/common';
import { ZonasDespachoController } from './zonas-despacho.controller';
import { ZonasDespachoService } from './zonas-despacho.service';

@Module({
  controllers: [ZonasDespachoController],
  providers: [ZonasDespachoService],
})
export class ZonasDespachoModule {}
