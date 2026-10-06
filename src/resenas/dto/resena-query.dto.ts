import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class ResenaQueryDto {
  @ApiPropertyOptional({
    example: 1,
    minimum: 1,
    description: 'Filtrar reseñas por ID del producto',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'productoId debe ser un número entero' })
  @Min(1, { message: 'productoId debe ser mayor o igual a 1' })
  productoId?: number;

  @ApiPropertyOptional({
    example: 1,
    minimum: 1,
    description: 'Filtrar reseñas por ID del cliente',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'clienteId debe ser un número entero' })
  @Min(1, { message: 'clienteId debe ser mayor o igual a 1' })
  clienteId?: number;
}