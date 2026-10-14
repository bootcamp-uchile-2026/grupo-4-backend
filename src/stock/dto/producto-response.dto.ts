import { ApiProperty } from '@nestjs/swagger';

export class StockResponseDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del registro de stock',
  })
  id: string;

  @ApiProperty({
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Identificador del producto asociado al stock',
  })
  productoId: string;

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