import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, Min } from 'class-validator';

export class AddCartItemDto {
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
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto a agregar al carrito',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'quantity debe ser un número entero' }) // Validar que sea un número entero
  @Min(1, { message: 'quantity debe ser al menos 1' }) // Validar que sea al menos 1
  quantity: number;
}