import { ApiProperty } from '@nestjs/swagger';

export class CartItemResponseDto {
  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  itemId: number;

  @ApiProperty({
    example: 'Vino Los Portales',
    description: 'Nombre del producto',
  })
  itemName: string;

  @ApiProperty({
    example: 19990,
    minimum: 0,
    description: 'Precio unitario del producto',
  })
  unitPrice: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  quantity: number;

  @ApiProperty({
    example: 39980,
    minimum: 0,
    description: 'Subtotal correspondiente al producto',
  })
  subtotal: number;
}