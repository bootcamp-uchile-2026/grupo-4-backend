import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class ProductoQueryDto {
  nombre?: string;
  categoriaId?: number;
  proveedorId?: number;
  precioMin?: number;
  precioMax?: number;
  tipoConservacion?: TipoConservacion;
  descuento?: boolean;
}