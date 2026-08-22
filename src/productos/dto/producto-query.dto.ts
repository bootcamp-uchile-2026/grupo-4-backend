import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class ProductoQueryDto {
  @ApiPropertyOptional({
    description: 'Nombre del producto a buscar',
    example: 'Mermelada de frutilla',
  })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'ID de la categoría',
    example: 1,
  })
  categoriaId?: number;

  @ApiPropertyOptional({
    description: 'ID del proveedor',
    example: 1,
  })
  proveedorId?: number;

  @ApiPropertyOptional({
    description: 'Precio mínimo',
    example: 3000,
  })
  precioMin?: number;

  @ApiPropertyOptional({
    description: 'Precio máximo',
    example: 10000,
  })
  precioMax?: number;

  @ApiPropertyOptional({
    description: 'Tipo de conservación',
    enum: TipoConservacion,
    example: TipoConservacion.REFRIGERADO,
  })
  tipoConservacion?: TipoConservacion;

  @ApiPropertyOptional({
    description: 'Filtrar productos que tienen descuento',
    example: true,
  })
  descuento?: boolean;
}