// dto/historial-pedidos-paginado-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { HistorialPedidoResumenResponseDto } from './historial-pedido-resumen-response.dto';

export class HistorialPedidosPaginadoResponseDto {
  @ApiProperty({
    type: () => [HistorialPedidoResumenResponseDto],
    description: 'Pedidos de la página actual',
  })
  @IsArray( { message: 'El data debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => HistorialPedidoResumenResponseDto)
  data: HistorialPedidoResumenResponseDto[];

  @ApiProperty({ example: 1, minimum: 1, description: 'Página actual' })
  @IsInt({ message: 'La página debe ser un número entero' })
  @Min(1, { message: 'La página debe ser al menos 1' })
  page: number;

  @ApiProperty({ example: 10, minimum: 1, description: 'Pedidos por página' })
  @IsInt({ message: 'El límite debe ser un número entero' })
  @Min(1, { message: 'El límite debe ser al menos 1' })
  limit: number;

  @ApiProperty({ example: 25, minimum: 0, description: 'Total de pedidos que cumplen el filtro' })
  @IsInt({ message: 'El total debe ser un número entero' })
  @Min(0, { message: 'El total no puede ser negativo' })
  total: number;

  @ApiProperty({ example: 3, minimum: 0, description: 'Total de páginas' })
  @IsInt({ message: 'El total de páginas debe ser un número entero' })
  @Min(0, { message: 'El total de páginas no puede ser negativo' })
  totalPages: number;
}