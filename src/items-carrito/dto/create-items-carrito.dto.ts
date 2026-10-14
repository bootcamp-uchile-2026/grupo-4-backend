import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemsCarritoDto {
  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'itemId debe ser un número entero' })
  @IsPositive({ message: 'itemId debe ser mayor que 0' })
  itemId: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    maximum: 99,
    description: 'Cantidad de unidades del producto a agregar al carrito',
  })
  @Type(() => Number)
  @IsInt({ message: 'quantity debe ser un número entero' })
  @Min(1, { message: 'quantity debe ser al menos 1' })
  @Max(99, { message: 'quantity no puede superar 99' })
  quantity: number;
}