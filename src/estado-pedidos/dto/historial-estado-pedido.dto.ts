import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { EstadoPedido } from '../../pedidos/enums/estado-pedido.enum'; // ajusta la ruta

export class HistorialEstadoResponseDto {
  @ApiProperty({ 
    enum: EstadoPedido, 
    example: EstadoPedido.PENDIENTE, 
    description: 'Estado anterior' 
  })
  @IsEnum(EstadoPedido)
  estadoAnterior: EstadoPedido;

  @ApiProperty({ 
    enum: EstadoPedido, 
    example: EstadoPedido.EN_PREPARACION, 
    description: 'Estado nuevo' 
  })
  @IsEnum(EstadoPedido)
  estadoNuevo: EstadoPedido;

  @ApiProperty({ 
    example: 3, 
    minimum: 1, 
    description: 'Usuario que realizó el cambio' 
  })
  @IsInt({ message: 'usuarioId debe ser un número entero' })
  @IsPositive({ message: 'usuarioId debe ser un número positivo' })
  usuarioId: number;

  @ApiProperty({
    example: 'Pedido recibido en bodega',
    nullable: true,
    description: 'Comentario del cambio, si lo hubo',
  })
  @IsOptional({ message: 'comentario es opcional' })
  @IsString({ message: 'comentario debe ser un texto' })
  comentario: string | null;

  @ApiProperty({
    example: '2026-08-28T15:30:00.000Z',
    type: String,
    format: 'date-time',
    description: 'Fecha y hora del cambio',
  })
  @Type(() => Date)
  @IsDate({ message: 'fecha debe ser una fecha válida' })
  fecha: Date;
}