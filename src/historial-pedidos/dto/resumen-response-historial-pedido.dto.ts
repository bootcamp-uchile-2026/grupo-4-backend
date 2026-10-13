import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNumber, IsPositive, Min } from 'class-validator';
import { EstadoPedido } from '../../pedidos/enums/estado-pedido.enum';

export class HistorialPedidoResumenResponseDto {
  @ApiProperty({ example: 1, minimum: 1, description: 'Identificador único del pedido' })
  @IsInt({ message: 'El id debe ser un número entero' })
  @IsPositive({ message: 'El id debe ser un número positivo' })
  id: number;

  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.PENDIENTE,
    description: 'Estado actual del pedido',
  })
  @IsEnum(EstadoPedido)
  estado: EstadoPedido;

  @ApiProperty({
    example: '2026-08-28T15:30:00.000Z',
    type: String,
    format: 'date-time',
    description: 'Fecha y hora en que se creó el pedido',
  })
  @Type(() => Date)
  @IsDate()
  fechaCreacion: Date;

  @ApiProperty({ example: 3, minimum: 0, description: 'Cantidad total de productos del pedido' })
  @IsInt({ message: 'El total de items debe ser un número entero' })
  @Min(0, { message: 'El total de items no puede ser negativo' })
  totalItems: number;

  @ApiProperty({ example: 36970, minimum: 0, description: 'Precio total del pedido' })
  @IsNumber({}, { message: 'El total del precio debe ser un número' })
  @Min(0, { message: 'El total del precio no puede ser negativo' })
  totalPrice: number;
}