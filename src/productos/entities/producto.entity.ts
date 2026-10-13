import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public ingredientes: string,
    public categoriaId: number,
    public proveedorId: number,
    public precio: number,
    public tipoConservacion: TipoConservacion,
    public valorNutricional?: string,
    public fechaVencimiento?: Date,
    public descuento?: number,
    public precioDescuento?: number,
    public imagen?: string,
    public valoracion?: number,
    public favorito?: boolean,
  ) {}
}