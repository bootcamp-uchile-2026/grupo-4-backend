export class Stock {
  constructor(
    public id: string,
    public productoId: string,
    public cantidad: number,
    public stockMinimo: number,
  ) {}
}