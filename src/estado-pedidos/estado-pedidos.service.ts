import { Injectable } from '@nestjs/common';
import { UpdateEstadoPedidoDto } from './dto/update-estado-pedido.dto';

@Injectable()
export class EstadoPedidosService {

  findAll(pedidoId?: number) {
    return `This action returns all estadoPedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoPedido`;
  }

  update(id: number, updateEstadoPedidoDto: UpdateEstadoPedidoDto) {
    return `This action updates a #${id} estadoPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoPedido`;
  }
  cancelar(pedidoId: number) {
    return { pedidoId, estado: 'CANCELADO', transicionesPermitidas: [] };
  }
}
