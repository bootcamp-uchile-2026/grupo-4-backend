export class EstadoPedido {

    public id: number;
    public pedidoId: number;
    public estadoAnterior: string;
    public estadoNuevo: string;
    public comentario: string | null;
    public fecha: Date;
}
