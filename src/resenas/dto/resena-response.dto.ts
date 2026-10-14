import { ApiProperty } from '@nestjs/swagger';

export class ResenaResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único de la reseña',
  })
  id: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Id del cliente asociado a la reseña',
  })
  clienteId: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Id del producto asociado a la reseña',
  })
  productoId: number;

  @ApiProperty({
    example: 'El mejor producto de la vida',
    description: 'Título de la reseña',
  })
  titulo: string;

  @ApiProperty({
    example: 'Este producto me ha ayudado con...',
    description: 'Detalle de la reseña',
    required: false,
  })
  detalle?: string;

  @ApiProperty({
    example: 5,
    minimum: 1,
    maximum: 5,
    description: 'Rating asociado a la reseña. De 1 a 5 estrellas.',
  })
  estrellas: number;
}

