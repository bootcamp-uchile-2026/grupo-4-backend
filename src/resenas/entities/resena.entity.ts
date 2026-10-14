export class Resena {
  constructor(
    public id: number,
    public clienteId: number,
    public productoId: number,
    public titulo: string,
    public estrellas: number,
    public detalle?: string,
  ) {}
}