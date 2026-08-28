import { ApiProperty } from '@nestjs/swagger';

import { EstadoPedido } from '../enums/estado-pedido.enum';

export class UpdateEstadoPedidoDto {
  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.EN_PREPARACION,
    description: 'Nuevo estado del pedido',
  })
  estado: EstadoPedido;
}