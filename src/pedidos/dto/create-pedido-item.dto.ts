import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoItemDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  productoId: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  cantidad: number;
}