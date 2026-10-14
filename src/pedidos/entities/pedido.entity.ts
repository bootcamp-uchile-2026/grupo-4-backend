import { PedidoItem } from './pedido-item.entity';
import { EstadoPedido } from '../enums/estado-pedido.enum';

export class Pedido {
  constructor(
    public id: number,
    public usuarioId: number,
    public items: PedidoItem[],
    public totalItems: number,
    public totalPrice: number,
    public estado: EstadoPedido,
    public fechaCreacion: Date,
  ) {}
}