import { ApiProperty } from '@nestjs/swagger';
import { EstadoPedido } from '../enums/estado-pedido.enum';
import { PedidoItemResponseDto } from './pedido-item-response.dto';

export class PedidoResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del pedido',
  })
  id: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del usuario que realizó el pedido',
  })
  usuarioId: number;

  @ApiProperty({
    type: () => [PedidoItemResponseDto],
    description: 'Productos incluidos en el pedido',
  })
  items: PedidoItemResponseDto[];

  @ApiProperty({
    example: 3,
    minimum: 0,
    description: 'Cantidad total de productos incluidos en el pedido',
  })
  totalItems: number;

  @ApiProperty({
    example: 36970,
    minimum: 0,
    description: 'Precio total del pedido',
  })
  totalPrice: number;

  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.PENDIENTE,
    description: 'Estado actual del pedido',
  })
  estado: EstadoPedido;

  @ApiProperty({
    example: '2026-08-28T15:30:00.000Z',
    description: 'Fecha y hora en que se creó el pedido',
    type: String,
    format: 'date-time',
  })
  fechaCreacion: Date;
}