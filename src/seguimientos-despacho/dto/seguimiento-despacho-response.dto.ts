import { ApiProperty } from '@nestjs/swagger';
import { EstadoSeguimiento } from '../enums/estado-seguimiento.enum';

export class SeguimientoDespachoResponseDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del seguimiento',
  })
  id: string;

  @ApiProperty({
    example: 'a3bb189e-8bf9-4888-9912-ace4e6543002',
    description: 'ID del despacho al que pertenece el seguimiento',
  })
  despachoId: string;

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
