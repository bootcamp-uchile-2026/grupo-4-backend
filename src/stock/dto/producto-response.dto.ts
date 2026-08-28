import { ApiProperty } from '@nestjs/swagger';

export class StockResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del registro de stock',
  })
  id: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del producto asociado al stock',
  })
  productoId: number;

  @ApiProperty({
    example: 50,
    minimum: 0,
    description: 'Cantidad disponible del producto',
  })
  cantidad: number;

  @ApiProperty({
    example: 10,
    minimum: 0,
    description: 'Cantidad mínima de stock antes de considerarlo bajo',
  })
  stockMinimo: number;
}