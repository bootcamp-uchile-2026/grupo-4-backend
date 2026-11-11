import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosFacturacion } from './entities/datos-facturacion.entity';
import { Module } from '@nestjs/common';
import { DatosFacturacionService } from './datos-facturacion.service';
import { DatosFacturacionController } from './datos-facturacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DatosFacturacion])],
  controllers: [DatosFacturacionController],
  providers: [DatosFacturacionService],
})
export class DatosFacturacionModule {}
