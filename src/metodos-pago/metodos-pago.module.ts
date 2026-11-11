import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodosPago } from './entities/metodos-pago.entity';
import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';
import { MetodosPagoController } from './metodos-pago.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetodosPago])],
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
})
export class MetodosPagoModule {}
