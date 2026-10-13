import { ApiProperty } from '@nestjs/swagger';

export class TiempoEntregaResponseDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del tiempo de entrega',
  })
  id: string;

  @ApiProperty({
    example: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    description: 'ID de la zona de despacho a la que aplica el tiempo',
  })
  zonaId: string;

  @ApiProperty({
    example: 1,
    minimum: 0,
    description: 'Días mínimos que demora la entrega',
  })
  diasMinimo: number;

  @ApiProperty({
    example: 3,
    minimum: 0,
    description: 'Días máximos que demora la entrega',
  })
  diasMaximo: number;
}
