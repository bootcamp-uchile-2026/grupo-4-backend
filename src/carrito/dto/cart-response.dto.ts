import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponseDto } from './cart-item-response.dto';
import { IsArray, IsInt, IsNumber, IsPositive, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CartResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del carrito',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'cartId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'cartId debe ser mayor que 0' }) // Validar que sea un número positivo
  cartId: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del usuario propietario del carrito',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'userId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'userId debe ser mayor que 0' }) // Validar que sea un número positivo
  userId: number;

  @ApiProperty({
    type: () => [CartItemResponseDto],
    description: 'Productos incluidos en el carrito',
  })
  @IsArray({ message: 'items debe ser un arreglo' }) // Validar que sea un arreglo
  @ValidateNested({ each: true }) // Validar que cada elemento del arreglo sea un objeto anidado válido
  @Type(() => CartItemResponseDto) // Transformar cada elemento del arreglo a una instancia de CartItemResponseDto
  items: CartItemResponseDto[];

  @ApiProperty({
    example: 4,
    minimum: 0,
    description: 'Cantidad total de productos en el carrito',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'totalItems debe ser un número entero' }) // Validar que sea un número entero
  @Min(0, { message: 'totalItems debe ser al menos 0' }) // Validar que sea al menos 0
  totalItems: number;

  @ApiProperty({
    example: 82990,
    minimum: 0,
    description: 'Precio total de los productos del carrito',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsNumber({}, { message: 'totalPrice debe ser un número' }) // Validar que sea un número
  @Min(0, { message: 'totalPrice debe ser al menos 0' }) // Validar que sea al menos 0
  totalPrice: number;
}