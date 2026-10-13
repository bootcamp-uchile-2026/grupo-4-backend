import { Module } from '@nestjs/common';
import { EstadoPedidosService } from './estado-pedidos.service';
import { EstadoPedidosController } from './estado-pedidos.controller';

@Module({
  controllers: [EstadoPedidosController],
  providers: [EstadoPedidosService],
})
export class EstadoPedidosModule {}
