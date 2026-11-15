import { ApiProperty } from '@nestjs/swagger';

export class ImagenResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la imagen',
  })
  id: number;

  @ApiProperty({
    example: '/uploads/productos/imagen1.webp',
    description: 'Ruta pública de la imagen',
  })
  ruta: string;

  @ApiProperty({
    example: true,
    description: 'Indica si es la imagen principal',
  })
  esPrincipal: boolean;
}
