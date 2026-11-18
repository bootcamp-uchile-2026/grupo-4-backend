import { ApiProperty } from '@nestjs/swagger';
import { EstadoDespacho } from '../enums/estado-despacho.enum';

export class DespachoResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del despacho',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del pedido que se despacha',
  })
  pedidoId: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la zona de despacho',
  })
  zonaId: number | null;

  @ApiProperty({
    enum: EstadoDespacho,
    example: EstadoDespacho.PENDIENTE,
    description: 'Estado del despacho',
  })
  estado: EstadoDespacho;
}
