import { Module } from '@nestjs/common';
import { TiemposEntregaController } from './tiempos-entrega.controller';
import { TiemposEntregaService } from './tiempos-entrega.service';

@Module({
  controllers: [TiemposEntregaController],
  providers: [TiemposEntregaService],
})
export class TiemposEntregaModule {}
