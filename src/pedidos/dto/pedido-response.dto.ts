import { ApiProperty } from '@nestjs/swagger';
import { EstadoPedido } from '../enums/estado-pedido.enum';
import { PedidoItemResponseDto } from './pedido-item-response.dto';
import { IsInt, IsPositive, Min, IsArray, ValidateNested, ArrayNotEmpty, IsNumber, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class PedidoResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del pedido',
  })
  @IsInt({ message: 'id debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'id debe ser mayor que 0' }) // Validar que sea un número positivo
  @Min(1, { message: 'id debe ser al menos 1' }) // Validar que sea al menos 1
  id: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del usuario que realizó el pedido',
  })
  @IsInt({ message: 'usuarioId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'usuarioId debe ser mayor que 0' }) // Validar que sea un número positivo
  @Min(1, { message: 'usuarioId debe ser al menos 1' }) // Validar que sea al menos 1
  usuarioId: number;

  @ApiProperty({
    type: () => [PedidoItemResponseDto],
    description: 'Productos incluidos en el pedido',
  })
  @IsArray({ message: 'items debe ser un arreglo' }) // Validar que sea un arreglo
  @ArrayNotEmpty({ message: 'el pedido debe incluir al menos un producto' }) // Validar que no esté vacío
  @ValidateNested({ each: true }) // Validar cada elemento del arreglo
  @Type(() => PedidoItemResponseDto) // Transformar cada elemento a PedidoItemResponseDto
  items: PedidoItemResponseDto[];

  @ApiProperty({
    example: 3,
    minimum: 0,
    description: 'Cantidad total de productos incluidos en el pedido',
  })
  @IsInt({ message: 'totalItems debe ser un número entero' }) // Validar que sea un número entero
  @Min(0, { message: 'totalItems debe ser al menos 0' }) // Validar que sea al menos 0
  totalItems: number;

  @ApiProperty({
    example: 36970,
    minimum: 0,
    description: 'Precio total del pedido',
  })
  @IsNumber({}, { message: 'totalPrice debe ser un número' }) // Validar que sea un número
  @Min(0, { message: 'totalPrice debe ser al menos 0' }) // Validar que sea al menos 0
  totalPrice: number;

  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.PENDIENTE,
    description: 'Estado actual del pedido',
  })
  @IsEnum(EstadoPedido, { message: 'estado debe ser un valor válido de EstadoPedido' }) // Validar que sea un valor del enum EstadoPedido
  estado: EstadoPedido;

  @ApiProperty({
    example: '2026-08-28T15:30:00.000Z',
    description: 'Fecha y hora en que se creó el pedido',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date) // Transformar a objeto Date
  @IsDate({ message: 'fechaCreacion debe ser una fecha válida' }) // Validar que sea una fecha
  fechaCreacion: Date;
}