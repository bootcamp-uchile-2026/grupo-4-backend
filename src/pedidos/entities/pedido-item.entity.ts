export class PedidoItem {
  constructor(
    public productoId: number,
    public productoNombre: string,
    public precioUnitario: number,
    public cantidad: number,
    public subtotal: number,
  ) {}
}