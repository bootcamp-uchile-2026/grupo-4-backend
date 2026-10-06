export class Resena {
  id?: number;
  clienteId: number;
  productoId: number;
  titulo: string;
  detalle?: string;
  estrellas: number;

  constructor(
    clienteId: number,
    productoId: number,
    titulo: string,
    detalle: string | undefined,
    estrellas: number,
  ) {
    this.clienteId = clienteId;
    this.productoId = productoId;
    this.titulo = titulo;
    this.detalle = detalle;
    this.estrellas = estrellas;
  }
}