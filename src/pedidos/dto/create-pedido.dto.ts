import { ApiProperty } from '@nestjs/swagger';
import { CreatePedidoItemDto } from './create-pedido-item.dto';
import { ArrayNotEmpty, IsArray, IsInt, IsPositive, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del usuario que realiza el pedido',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'usuarioId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'usuarioId debe ser mayor que 0' }) // Validar que sea un número positivo
  @Min(1, { message: 'usuarioId debe ser al menos 1' }) // Validar que sea al menos 1
  usuarioId: number;

  @ApiProperty({
    type: () => [CreatePedidoItemDto],
    description: 'Productos incluidos en el pedido',
  })
  @IsArray({ message: 'items debe ser un arreglo' }) // Validar que sea un arreglo
  @ArrayNotEmpty({ message: 'el pedido debe incluir al menos un producto' }) // Validar que no esté vacío
  @ValidateNested({ each: true }) // Validar cada elemento del arreglo
  @Type(() => CreatePedidoItemDto) // Transformar cada elemento a CreatePedidoItemDto
  items: CreatePedidoItemDto[];
}