import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class CreateProductoDto {
  nombre: string;
  descripcion: string;
  ingredientes: string;
  valorNutricional: string;
  categoriaId: number;
  proveedorId: number;
  precio: number;
  fechaVencimiento: Date;
  descuento: number;
  imagen: string;
  tipoConservacion: TipoConservacion;
}