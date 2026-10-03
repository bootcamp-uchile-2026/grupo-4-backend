import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  @IsNumber()
  itemId: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto a agregar al carrito',
  })
  @IsNumber()
  quantity: number;
}