import { ApiProperty } from '@nestjs/swagger';

export class DireccionResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único de la dirección',
  })
  id: number;

  @ApiProperty({
    example: 'Av. Providencia',
    description: 'Nombre de la calle',
  })
  calle: string;

  @ApiProperty({
    example: '1234',
    description: 'Número de la dirección',
  })
  numero: string;

  @ApiProperty({
    example: 'Providencia',
    description: 'Comuna de la dirección',
  })
  comuna: string;

  @ApiProperty({
    example: 'Santiago',
    description: 'Ciudad de la dirección',
  })
  ciudad: string;

  @ApiProperty({
    example: 'Región Metropolitana',
    description: 'Región de la dirección',
  })
  region: string;
}