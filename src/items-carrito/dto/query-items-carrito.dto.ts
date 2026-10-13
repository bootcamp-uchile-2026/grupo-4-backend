import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, } from 'class-validator';
import { TipoConservacion } from '../../productos/enums/tipo-conservacion.enum';

export const CAMPOS_ORDENABLES = ['itemName', 'unitPrice', 'quantity', 'subtotal'] as const;
export type CampoOrdenable = (typeof CAMPOS_ORDENABLES)[number];

export class ItemsCarritoQueryDto {
  @ApiPropertyOptional({
    example: 'mermelada',
    description: 'Texto a buscar en el nombre del producto',
    maxLength: 100,
  })
  @IsOptional({ message: 'search es opcional' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'search debe ser un texto' })
  @IsNotEmpty({ message: 'search no puede estar vacío' })
  @MaxLength(100, { message: 'search no puede superar los 100 caracteres' })
  search?: string;

  @ApiPropertyOptional({
    enum: TipoConservacion,
    description: 'Filtra por tipo de conservación del producto',
  })
  @IsOptional({ message: 'tipoConservacion es opcional' })
  @IsEnum(TipoConservacion, { message: 'tipoConservacion no es válido' })
  tipoConservacion?: TipoConservacion;

  @ApiPropertyOptional({
    enum: CAMPOS_ORDENABLES,
    default: 'itemName',
    description: 'Campo por el cual ordenar los ítems',
  })
  @IsOptional({ message: 'sortBy es opcional' })
  @IsIn(CAMPOS_ORDENABLES, {
    message: `sortBy debe ser uno de: ${CAMPOS_ORDENABLES.join(', ')}`,
  })
  sortBy?: CampoOrdenable = 'itemName';

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC'],
    default: 'ASC',
    description: 'Dirección del orden',
  })
  @IsOptional({ message: 'order es opcional' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  @IsIn(['ASC', 'DESC'], { message: 'order debe ser ASC o DESC' })
  order?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({
    example: 1,
    minimum: 1,
    default: 1,
    description: 'Número de página',
  })
  @IsOptional({ message: 'page es opcional' })
  @Type(() => Number)
  @IsInt({ message: 'page debe ser un número entero' })
  @Min(1, { message: 'page debe ser al menos 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Cantidad de ítems por página',
  })
  @IsOptional({ message: 'limit es opcional' })
  @Type(() => Number)
  @IsInt({ message: 'limit debe ser un número entero' })
  @Min(1, { message: 'limit debe ser al menos 1' })
  @Max(50, { message: 'limit no puede superar 50' })
  limit?: number = 10;
}