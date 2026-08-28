import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'ID del producto asociado al stock',
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
    description: 'Cantidad mínima de stock permitida antes de considerar stock bajo',
  })
  stockMinimo: number;
}