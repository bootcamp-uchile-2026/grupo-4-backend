import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class ProductoQueryDto {
  @ApiPropertyOptional({
    description: 'Busca productos cuyo nombre contenga el texto indicado',
    example: 'Mermelada',
  })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'ID de la categoría',
    example: 1,
    minimum: 1,
  })
  categoriaId?: number;

  @ApiPropertyOptional({
    description: 'ID del proveedor',
    example: 1,
    minimum: 1,
  })
  proveedorId?: number;

  @ApiPropertyOptional({
    description: 'Precio mínimo',
    example: 3000,
    minimum: 1,
  })
  precioMin?: number;

  @ApiPropertyOptional({
    description: 'Precio máximo',
    example: 10000,
    minimum: 1,
  })
  precioMax?: number;

  @ApiPropertyOptional({
    description: 'Tipo de conservación',
    enum: TipoConservacion,
    example: TipoConservacion.REFRIGERADO,
    examples: [TipoConservacion.REFRIGERADO, TipoConservacion.AMBIENTE, TipoConservacion.CONGELADO],
  })
  tipoConservacion?: TipoConservacion;

  @ApiPropertyOptional({
    description: 'Filtrar productos que tienen descuento',
    example: true,
  })
  tieneDescuento?: boolean;
}