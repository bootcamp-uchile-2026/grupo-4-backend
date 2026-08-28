export class Stock {
  constructor(
    public id: number,
    public productoId: number,
    public cantidad: number,
    public stockMinimo: number,
  ) {}
}