export class ConfirmacionCompra {
  constructor(
    public numeroPedido: number,
    public mensaje: string,
    public detalleEmail: string,
    public entregaEstimada: string,
    public direccion: string,
    public acciones: string[],
  ) {}
}