import { ApiProperty } from '@nestjs/swagger';

export class ZonaDespachoResponseDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la zona de despacho',
  })
  id: string;

  @ApiProperty({
    example: 'Santiago Oriente',
    description: 'Nombre de la zona de despacho',
  })
  nombre: string;

  @ApiProperty({
    type: [String],
    example: ['Las Condes', 'Vitacura', 'La Reina'],
    description: 'Comunas que cubre la zona',
  })
  comunas: string[];

  @ApiProperty({
    example: 3990,
    minimum: 0,
    description: 'Costo de envío a la zona',
  })
  costoEnvio: number;

  @ApiProperty({
    example: true,
    description: 'Indica si la zona está activa',
  })
  activa: boolean;
}
