import { Injectable } from '@nestjs/common';
import { CreateHistorialPedidoDto } from './dto/create-historial-pedido.dto';
import { UpdateHistorialPedidoDto } from './dto/update-historial-pedido.dto';

@Injectable()
export class HistorialPedidosService {
  create(createHistorialPedidoDto: CreateHistorialPedidoDto) {
    return 'This action adds a new historialPedido';
  }

  findAll() {
    return `This action returns all historialPedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialPedido`;
  }

  update(id: number, updateHistorialPedidoDto: UpdateHistorialPedidoDto) {
    return `This action updates a #${id} historialPedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialPedido`;
  }
}
