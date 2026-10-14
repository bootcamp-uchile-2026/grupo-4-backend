import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoItemDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'productoId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'productoId debe ser mayor que 0' }) // Validar que sea un número positivo
  @Min(1, { message: 'productoId debe ser al menos 1' }) // Validar que sea al menos 1
  productoId: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'cantidad debe ser un número entero' }) // Validar que sea un número entero
  @Min(1, { message: 'cantidad debe ser al menos 1' }) // Validar que sea al menos 1
  cantidad: number;
}