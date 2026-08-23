import { ApiProperty } from '@nestjs/swagger';

import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class ProductoResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  id: number;

  @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto',
  })
  nombre: string;

  @ApiProperty({
    example: 'Mermelada artesanal elaborada con frutillas de la zona central.',
    description: 'Descripción del producto',
  })
  descripcion: string;

  @ApiProperty({
    example: 'Frutillas, azúcar, jugo de limón',
    description: 'Ingredientes del producto',
  })
  ingredientes: string;

  @ApiProperty({
    example: 'Energía: 250 kcal por 100g',
    description: 'Información nutricional del producto',
  })
  valorNutricional: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador de la categoría',
  })
  categoriaId: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador del proveedor',
  })
  proveedorId: number;

  @ApiProperty({
    example: 5990,
    minimum: 1,
    description: 'Precio del producto',
  })
  precio: number;

  @ApiProperty({
    example: '2026-12-31',
    type: String,
    format: 'date',
    description: 'Fecha de vencimiento del producto',
  })
  fechaVencimiento: Date;

  @ApiProperty({
    example: 10,
    minimum: 0,
    maximum: 100,
    description: 'Porcentaje de descuento aplicado al producto',
  })
  descuento: number;

  @ApiProperty({
    example: 5391,
    minimum: 0,
    description: 'Precio final del producto con descuento',
  })
  precioDescuento: number;

  @ApiProperty({
    example: 'https://ejemplo.com/mermelada-frutilla.jpg',
    description: 'URL de la imagen del producto',
  })
  imagen: string;

  @ApiProperty({
    enum: TipoConservacion,
    example: TipoConservacion.AMBIENTE,
    description: 'Tipo de conservación requerido por el producto',
  })
  tipoConservacion: TipoConservacion;

  @ApiProperty({
    example: 4.8,
    minimum: 0,
    maximum: 5,
    description: 'Valoración promedio del producto',
  })
  valoracion: number;

  @ApiProperty({
    example: false,
    description: 'Indica si el producto está destacado como favorito de la tienda',
  })
  favorito: boolean;
}