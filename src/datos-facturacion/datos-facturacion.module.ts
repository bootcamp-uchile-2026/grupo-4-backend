import { Module } from '@nestjs/common';
import { DatosFacturacionService } from './datos-facturacion.service';
import { DatosFacturacionController } from './datos-facturacion.controller';

@Module({
  controllers: [DatosFacturacionController],
  providers: [DatosFacturacionService],
})
export class DatosFacturacionModule {}
