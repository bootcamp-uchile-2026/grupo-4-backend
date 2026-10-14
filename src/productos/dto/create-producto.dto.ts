import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoConservacion } from '../enums/tipo-conservacion.enum';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto',
  })
  @IsString({ message: 'nombre debe ser un texto' })
  @IsNotEmpty({ message: 'nombre no puede estar vacío' })
  @Matches(/\S/, {
    message: 'nombre no puede contener solo espacios',
  })
  nombre: string;

  @ApiProperty({
    example: 'Mermelada artesanal elaborada con frutillas.',
    description: 'Descripción del producto',
  })
  @IsString({ message: 'descripcion debe ser un texto' })
  @IsNotEmpty({ message: 'descripcion no puede estar vacía' })
  @Matches(/\S/, {
    message: 'descripcion no puede contener solo espacios',
  })
  descripcion: string;

  @ApiProperty({
    example: 'Frutillas, azúcar, jugo de limón',
    description: 'Ingredientes del producto',
  })
  @IsString({ message: 'ingredientes debe ser un texto' })
  @IsNotEmpty({ message: 'ingredientes no puede estar vacío' })
  @Matches(/\S/, {
    message: 'ingredientes no puede contener solo espacios',
  })
  ingredientes: string;

  @ApiPropertyOptional({
    example: '250 kcal por 100g',
    description: 'Información nutricional del producto',
  })
  @IsOptional()
  @IsString({ message: 'valorNutricional debe ser un texto' })
  @Matches(/\S/, {
    message: 'valorNutricional no puede contener solo espacios',
  })
  valorNutricional?: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'ID de la categoría del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'categoriaId debe ser un número entero' })
  @Min(1, { message: 'categoriaId debe ser un número positivo' })
  categoriaId: number;

  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'ID del proveedor del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'proveedorId debe ser un número entero' })
  @Min(1, { message: 'proveedorId debe ser un número positivo' })
  proveedorId: number;

  @ApiProperty({
    example: 5990,
    minimum: 0,
    description: 'Precio del producto',
  })
  @Type(() => Number)
  @IsInt({ message: 'precio debe ser un número entero' })
  @Min(0, { message: 'precio debe ser mayor o igual a 0' })
  precio: number;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'Fecha de vencimiento del producto',
    type: String,
    format: 'date',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate({
    message: 'fechaVencimiento debe ser una fecha válida',
  })
  fechaVencimiento?: Date;

  @ApiPropertyOptional({
    example: 10,
    minimum: 0,
    maximum: 100,
    description: 'Porcentaje de descuento del producto',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: 'descuento debe ser un número entero' })
  @Min(0, { message: 'descuento debe ser mayor o igual a 0' })
  @Max(100, { message: 'descuento debe ser menor o igual a 100' })
  descuento?: number;

  @ApiPropertyOptional({
    example: 'https://ejemplo.com/mermelada.jpg',
    description: 'URL de la imagen del producto',
  })
  @IsOptional()
  @IsUrl({}, {
    message: 'imagen debe ser una URL válida',
  })
  imagen?: string;

  @ApiProperty({
    enum: TipoConservacion,
    example: TipoConservacion.REFRIGERADO,
    description: 'Tipo de conservación del producto',
  })
  @IsEnum(TipoConservacion, {
    message:
      'tipoConservacion debe ser AMBIENTE, REFRIGERADO o CONGELADO',
  })
  tipoConservacion: TipoConservacion;
}