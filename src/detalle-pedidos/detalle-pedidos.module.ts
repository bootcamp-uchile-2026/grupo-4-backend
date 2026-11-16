import { Module } from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service';
import { DetallePedidosController } from './detalle-pedidos.controller';

@Module({
  controllers: [],
  providers: [DetallePedidosService],
})
export class DetallePedidosModule {}
