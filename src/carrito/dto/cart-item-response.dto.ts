import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CartItemResponseDto {
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
    example: 'Vino Los Portales',
    description: 'Nombre del producto',
  })
  @IsString({ message: 'itemName debe ser una cadena de texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'itemName no debe estar vacío' }) // Validar que no esté vacío
  itemName: string;

  @ApiProperty({
    example: 19990,
    minimum: 0,
    description: 'Precio unitario del producto',
  })
  @IsNumber({}, { message: 'unitPrice debe ser un número' }) // Validar que sea un número
  @Min(0, { message: 'unitPrice debe ser al menos 0' }) // Validar que sea al menos 0
  unitPrice: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  @Type(() => Number) // Transformar el valor a un número
  @IsInt({ message: 'quantity debe ser un número entero' }) // Validar que sea un número entero
  @Min(1, { message: 'quantity debe ser al menos 1' }) // Validar que sea al menos 1
  quantity: number;

  @ApiProperty({
    example: 39980,
    minimum: 0,
    description: 'Subtotal correspondiente al producto',
  })
  @IsNumber({}, { message: 'subtotal debe ser un número' }) // Validar que sea un número
  @Min(0, { message: 'subtotal debe ser al menos 0' }) // Validar que sea al menos 0
  subtotal: number;
}