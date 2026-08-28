import { ApiProperty } from '@nestjs/swagger';

import { CartItemResponseDto } from './cart-item-response.dto';

export class CartResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del carrito',
  })
  cartId: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del usuario propietario del carrito',
  })
  userId: number;

  @ApiProperty({
    type: () => [CartItemResponseDto],
    description: 'Productos incluidos en el carrito',
  })
  items: CartItemResponseDto[];

  @ApiProperty({
    example: 4,
    minimum: 0,
    description: 'Cantidad total de productos en el carrito',
  })
  totalItems: number;

  @ApiProperty({
    example: 82990,
    minimum: 0,
    description: 'Precio total de los productos del carrito',
  })
  totalPrice: number;
}