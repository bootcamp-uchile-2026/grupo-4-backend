import { ApiProperty } from '@nestjs/swagger';

export class FavoritoResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del registro de favorito',
  })
  id: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del producto agregado a favoritos',
  })
  productoId: number;

  @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto agregado a favoritos',
  })
  nombre: string;

  @ApiProperty({
    example: 5000,
    minimum: 0,
    description: 'Precio actual del producto en pesos chilenos (CLP)',
  })
  precio: number;

  @ApiProperty({
    example: 'https://ejemplo.com/mermelada-frutilla.jpg',
    description: 'URL de la imagen del producto',
  })
  imagen: string;
}
