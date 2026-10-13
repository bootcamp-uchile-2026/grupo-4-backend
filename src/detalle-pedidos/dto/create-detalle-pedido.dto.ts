import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetallePedidoDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'productoId debe ser un número entero' })
  @IsPositive({ message: 'productoId debe ser mayor que 0' })
  productoId: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'cantidad debe ser un número entero' })
  @Min(1, { message: 'cantidad debe ser al menos 1' })
  cantidad: number;
}