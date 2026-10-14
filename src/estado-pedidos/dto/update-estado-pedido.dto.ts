import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { EstadoPedido } from '../../pedidos/enums/estado-pedido.enum';
export class UpdateEstadoPedidoDto {

  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.EN_PREPARACION,
    description: 'Nuevo estado del pedido',
  })
  @IsNotEmpty({ message: 'estado es obligatorio' })
  @IsEnum(EstadoPedido, { message: `estado debe ser uno de: ${Object.values(EstadoPedido).join(', ')}`, })
  estado: EstadoPedido;

  @ApiPropertyOptional({
    example: 'Pedido recibido en bodega',
    description: 'Comentario opcional sobre el cambio de estado',
    maxLength: 255,
  })
  @IsOptional({ message: 'comentario es opcional' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'comentario debe ser un texto' })
  @MaxLength(255, { message: 'comentario no puede superar los 255 caracteres' })
  comentario?: string;
}