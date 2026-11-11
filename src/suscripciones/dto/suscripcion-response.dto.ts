import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionResponseDTO {
  @ApiProperty({
    type: String,
    example: 1,
    description: 'Identificador de suscripción',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Esta caja satisfacerá tus deseos en cuanto a...',
    description: 'Descripción de la suscripción',
  })
  descripcion: string;

  @ApiProperty({
    type: String,
    example: 'Caja Básica - Vinos',
    description: 'Nombre de la suscripción. Debe ser único.',
  })
  nombre: string;

  @ApiProperty({
    type: Number,
    example: 19990,
    minimum: 1,
    description: 'Precio mensual de la suscripción',
  })
  precio: number;

  @ApiProperty({
    type: [String],
    example: ['safdasdvdavda', 'sfcsadvdv123'],
    minItems: 1,
    description: 'Ids de los productos incluidos en la suscripción',
  })
  productosId: number[];

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Estado de actividad en la página de la suscripción',
  })
  activa: boolean;
}
