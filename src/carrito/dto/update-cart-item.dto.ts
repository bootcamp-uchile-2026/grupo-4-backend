import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartItemDto {
@ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'itemId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'itemId debe ser mayor que 0' }) // Validar que sea un número positivo
  itemId: number;

  @ApiProperty({
    example: 5,
    minimum: 1,
    description: 'Nueva cantidad de unidades del producto en el carrito',
  })
  @Type(() => Number) // Transformar el valor a un número
  @IsInt({ message: 'quantity debe ser un número entero' }) // Validar que sea un número entero
  @Min(1, { message: 'quantity debe ser al menos 1' }) // Validar que sea al menos 1
  quantity: number;
}