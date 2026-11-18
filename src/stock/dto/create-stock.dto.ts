import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({
    example: 1,
    description: 'ID del producto asociado al stock',
  })
  @Type(() => Number)
  @IsInt({ message: 'productoId debe ser entero' })
  @Min(1)
  productoId: number;

  @ApiProperty({
    example: 50,
    minimum: 0,
    description: 'Cantidad disponible del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'cantidad debe ser un número entero' })
  @Min(0, { message: 'cantidad debe ser mayor o igual a 0' })
  cantidad: number;

  @ApiProperty({
    example: 10,
    minimum: 0,
    description:
      'Cantidad mínima de stock permitida antes de considerar stock bajo',
  })
  @Type(() => Number)
  @IsInt({ message: 'stockMinimo debe ser un número entero' })
  @Min(0, { message: 'stockMinimo debe ser mayor o igual a 0' })
  stockMinimo: number;
}
