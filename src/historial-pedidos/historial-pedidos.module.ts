import { Module } from '@nestjs/common';
import { HistorialPedidosService } from './historial-pedidos.service';
import { HistorialPedidosController } from './historial-pedidos.controller';

@Module({
  controllers: [HistorialPedidosController],
  providers: [HistorialPedidosService],
})
export class HistorialPedidosModule {}
