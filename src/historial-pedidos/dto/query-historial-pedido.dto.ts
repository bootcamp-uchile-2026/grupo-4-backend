import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { EstadoPedido } from '../../pedidos/enums/estado-pedido.enum';

export class HistorialPedidosQueryDto {
  @ApiPropertyOptional({ enum: EstadoPedido, description: 'Filtra por estado del pedido' })
  @IsOptional()
  @IsEnum(EstadoPedido, { message: 'estado no es válido' })
  estado?: EstadoPedido;

  @ApiPropertyOptional({
    example: '2026-08-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
    description: 'Pedidos creados desde esta fecha (inclusive)',
  })
  @IsOptional({ message: 'desde es opcional' })
  @Type(() => Date)
  @IsDate({ message: 'desde debe ser una fecha válida (ISO 8601)' })
  desde?: Date;

  @ApiPropertyOptional({
    example: '2026-08-31T23:59:59.999Z',
    type: String,
    format: 'date-time',
    description: 'Pedidos creados hasta esta fecha (inclusive)',
  })
  @IsOptional({ message: 'hasta es opcional' })
  @Type(() => Date)
  @IsDate({ message: 'hasta debe ser una fecha válida (ISO 8601)' })
  hasta?: Date;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    description: 'Orden por fecha de creación (más recientes primero por defecto)',
  })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  @IsIn(['ASC', 'DESC'], { message: 'order debe ser ASC o DESC' })
  order?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ example: 1, minimum: 1, default: 1, description: 'Número de página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page debe ser un número entero' })
  @Min(1, { message: 'page debe ser al menos 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Cantidad de pedidos por página',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit debe ser un número entero' })
  @Min(1, { message: 'limit debe ser al menos 1' })
  @Max(50, { message: 'limit no puede superar 50' })
  limit?: number = 10;
}