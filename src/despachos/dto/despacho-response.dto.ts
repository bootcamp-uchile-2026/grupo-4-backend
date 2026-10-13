import { ApiProperty } from '@nestjs/swagger';
import { EstadoDespacho } from '../enums/estado-despacho.enum';

export class DespachoResponseDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del despacho',
  })
  id: string;

  @ApiProperty({
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'ID del pedido que se despacha',
  })
  pedidoId: string;

  @ApiProperty({
    example: '9b2d5c1a-3e4f-4a6b-8c7d-0e1f2a3b4c5d',
    description: 'ID de la dirección de entrega',
  })
  direccionId: string;

  @ApiProperty({
    example: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    description: 'ID de la zona de despacho',
  })
  zonaId: string;

  @ApiProperty({
    enum: EstadoDespacho,
    example: EstadoDespacho.PENDIENTE,
    description: 'Estado del despacho',
  })
  estado: EstadoDespacho;
}
