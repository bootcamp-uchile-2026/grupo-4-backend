import { ApiProperty } from '@nestjs/swagger';

import { EstadoPedido } from '../enums/estado-pedido.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateEstadoPedidoDto {
  @ApiProperty({
    enum: EstadoPedido,
    example: EstadoPedido.EN_PREPARACION,
    description: 'Nuevo estado del pedido',
  })
  @IsNotEmpty({ message: 'estado no debe estar vacío' }) // Validar que no esté vacío
  @IsEnum(EstadoPedido, { message: 'estado debe ser un valor válido de EstadoPedido' }) // Validar que sea un valor del enum EstadoPedido
  estado: EstadoPedido;
}