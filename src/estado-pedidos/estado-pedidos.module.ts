import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialEstadoPedido } from './entities/historial-estado-pedido.entity';
import { Module } from '@nestjs/common';
import { EstadoPedidosService } from './estado-pedidos.service';
import { EstadoPedidosController } from './estado-pedidos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialEstadoPedido])],
  controllers: [EstadoPedidosController],
  providers: [EstadoPedidosService],
})
export class EstadoPedidosModule {}
