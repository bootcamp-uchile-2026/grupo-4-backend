import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class ProductoResponseDto {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  valorNutricional: string;
  categoriaId: number;
  proveedorId: number;
  precio: number;
  fechaVencimiento: Date;
  descuento: number;
  precioDescuento: number;
  imagen: string;
  tipoConservacion: TipoConservacion;
  valoracion: number;
  favorito: boolean;
}