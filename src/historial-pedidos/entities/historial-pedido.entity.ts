import { EstadoPedido } from '../../pedidos/enums/estado-pedido.enum';

export class HistorialPedido {

    public id: number;
    public estado: EstadoPedido;
    public fechaCreacion: Date;
    public totalItems: number;
    public totalPrice: number;
}
