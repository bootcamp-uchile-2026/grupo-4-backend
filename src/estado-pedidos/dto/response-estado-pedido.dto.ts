import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsPositive } from 'class-validator';
import { EstadoPedido } from '../../pedidos/enums/estado-pedido.enum';

export class EstadoPedidoResponseDto {
  @ApiProperty({ example: 1, minimum: 1, description: 'Identificador único del pedido' })
  @IsInt()
  @IsPositive()
  pedidoId: number;

  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.EN_PREPARACION,
    description: 'Estado actual del pedido',
  })
  @IsEnum(EstadoPedido)
  estado: EstadoPedido;

  @ApiProperty({
    enum: EstadoPedido,
    isArray: true,
    example: [EstadoPedido.EN_PREPARACION, EstadoPedido.CANCELADO],
    description: 'Estados a los que el pedido puede pasar desde el estado actual',
  })
  @IsArray()
  @IsEnum(EstadoPedido, { each: true })
  transicionesPermitidas: EstadoPedido[];
}