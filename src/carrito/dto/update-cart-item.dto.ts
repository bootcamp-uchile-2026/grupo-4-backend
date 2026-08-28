import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({
    example: 5,
    minimum: 1,
    description: 'Nueva cantidad de unidades del producto en el carrito',
  })
  quantity: number;
}