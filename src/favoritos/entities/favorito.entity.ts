export class Favorito {
  constructor(
    public id: number,
    public productoId: number,
    public nombre: string,
    public precio: number,
    public imagen: string,
  ) {}
}