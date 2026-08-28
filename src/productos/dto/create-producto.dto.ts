import { ApiProperty } from '@nestjs/swagger';
import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class CreateProductoDto {
  @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto',
  })
  nombre: string;

  @ApiProperty({
    example: 'Mermelada artesanal elaborada con frutillas.',
    description: 'Descripción del producto',
  })
  descripcion: string;

  @ApiProperty({
    example: 'Frutillas, azúcar, jugo de limón',
    description: 'Ingredientes del producto',
  })
  ingredientes: string;

  @ApiProperty({
    example: '250 kcal por 100g',
    description: 'Información nutricional del producto',
  })
  valorNutricional: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'ID de la categoría del producto',
  })
  categoriaId: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'ID del proveedor del producto',
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
    description: 'Fecha de vencimiento del producto',
    type: String,
    format: 'date',
  })
  fechaVencimiento: Date;

  @ApiProperty({
    example: 10,
    minimum: 0,
    maximum: 100,
    description: 'Porcentaje de descuento del producto',
  })
  descuento: number;

  @ApiProperty({
    example: 'https://ejemplo.com/mermelada.jpg',
    description: 'URL de la imagen del producto',
  })
  imagen: string;

  @ApiProperty({
    enum: TipoConservacion,
    example: TipoConservacion.REFRIGERADO,
    description: 'Tipo de conservación del producto',
  })
  tipoConservacion: TipoConservacion;
}