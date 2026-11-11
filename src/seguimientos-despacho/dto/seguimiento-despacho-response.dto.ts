import { ApiProperty } from '@nestjs/swagger';
import { EstadoSeguimiento } from '../enums/estado-seguimiento.enum';

export class SeguimientoDespachoResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del seguimiento',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del despacho al que pertenece el seguimiento',
  })
  despachoId: number;

  @ApiProperty({
    enum: EstadoSeguimiento,
    example: EstadoSeguimiento.EN_TRANSITO,
    description: 'Estado en que quedó el despacho con este avance',
  })
  estado: EstadoSeguimiento;

  @ApiProperty({
    example: 'El pedido va camino al centro de distribución.',
    description: 'Detalle del avance del despacho',
  })
  descripcion: string;

  @ApiProperty({
    example: '2026-10-12T15:30:00.000Z',
    description: 'Fecha y hora en que se registró el avance',
  })
  fecha: Date;
}
