import { Injectable } from '@nestjs/common';

@Injectable()
export class HistorialPedidosService {

  findAll() {
    return `This action returns all historialPedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialPedido`;
  }


  remove(id: number) {
    return `This action removes a #${id} historialPedido`;
  }
  findDetalle(pedidoId: number) {
    return { id: pedidoId, estado: 'PENDIENTE', fechaCreacion: '2026-10-13T00:00:00.000Z', totalItems: 0, totalPrice: 0, items: [] };
  }
}
