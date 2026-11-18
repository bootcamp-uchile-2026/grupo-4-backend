import { ApiProperty } from '@nestjs/swagger';

export class ZonaDespachoResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la zona de despacho',
  })
  id: number;

  @ApiProperty({
    example: 'Santiago Oriente',
    description: 'Nombre de la zona de despacho',
  })
  nombre: string;
}
