import { ApiProperty } from '@nestjs/swagger';
import { CreatePedidoItemDto } from './create-pedido-item.dto';

export class CreatePedidoDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del usuario que realiza el pedido',
  })
  usuarioId: number;

  @ApiProperty({
    type: () => [CreatePedidoItemDto],
    description: 'Productos incluidos en el pedido',
  })
  items: CreatePedidoItemDto[];
}