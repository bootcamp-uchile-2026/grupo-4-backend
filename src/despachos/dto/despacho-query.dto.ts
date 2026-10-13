import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { EstadoDespacho } from '../enums/estado-despacho.enum';

export class DespachoQueryDto {
  @ApiPropertyOptional({
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Filtrar despachos por ID del pedido',
  })
  @IsOptional()
  @IsUUID('all', { message: 'pedidoId debe ser un UUID válido' })
  pedidoId?: string;

  @ApiPropertyOptional({
    enum: EstadoDespacho,
    example: EstadoDespacho.PENDIENTE,
    description: 'Filtrar despachos por estado',
  })
  @IsOptional()
  @IsEnum(EstadoDespacho, {
    message:
      'estado debe ser PENDIENTE, EN_PREPARACION, EN_CAMINO, ENTREGADO o CANCELADO',
  })
  estado?: EstadoDespacho;
}
