import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TipoConservacion } from '../enums/tipo-conservacion.enum';

export class ProductoQueryDto {
  @ApiPropertyOptional({
    description: 'Busca productos cuyo nombre contenga el texto indicado',
    example: 'Mermelada',
  })
  @IsOptional()
  @IsString({
    message: 'nombre debe ser un texto',
  })
  @Matches(/\S/, {
    message: 'nombre no puede contener solo espacios',
  })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'ID de la categoría',
    example: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({
    message: 'categoriaId debe ser un número entero',
  })
  @Min(1, {
    message: 'categoriaId debe ser mayor o igual a 1',
  })
  categoriaId?: number;

  @ApiPropertyOptional({
    description: 'ID del proveedor',
    example: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({
    message: 'proveedorId debe ser un número entero',
  })
  @Min(1, {
    message: 'proveedorId debe ser mayor o igual a 1',
  })
  proveedorId?: number;

  @ApiPropertyOptional({
    description: 'Precio mínimo',
    example: 3000,
    minimum: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({
    message: 'precioMin debe ser un número entero',
  })
  @Min(0, {
    message: 'precioMin debe ser mayor o igual a 0',
  })
  precioMin?: number;

  @ApiPropertyOptional({
    description: 'Precio máximo',
    example: 10000,
    minimum: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({
    message: 'precioMax debe ser un número entero',
  })
  @Min(0, {
    message: 'precioMax debe ser mayor o igual a 0',
  })
  precioMax?: number;

  @ApiPropertyOptional({
    description: 'Tipo de conservación',
    enum: TipoConservacion,
    example: TipoConservacion.REFRIGERADO,
  })
  @IsOptional()
  @IsEnum(TipoConservacion, {
    message:
      'tipoConservacion debe ser AMBIENTE, REFRIGERADO o CONGELADO',
  })
  tipoConservacion?: TipoConservacion;

  @ApiPropertyOptional({
    description: 'Filtrar productos que tienen descuento',
    example: true,
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsOptional()
  @IsBoolean({
    message: 'tieneDescuento debe ser un booleano',
  })
  tieneDescuento?: boolean;
}