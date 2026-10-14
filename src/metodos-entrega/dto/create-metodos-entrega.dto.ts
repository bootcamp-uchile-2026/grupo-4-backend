import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, } from 'class-validator';
import { TipoEntrega } from '../enum/tipos-entrega.enum';
import { TipoConservacion } from '../../productos/enums/tipo-conservacion.enum'; 

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateMetodosEntregaDto {
  @ApiProperty({ 
    example: 'Despacho refrigerado', 
    description: 'Nombre del método', 
    maxLength: 100 })
  @Transform(trim)
  @IsString({ message: 'nombre debe ser un texto' })
  @IsNotEmpty({ message: 'nombre no puede estar vacío' })
  @MaxLength(100, { message: 'nombre no puede superar los 100 caracteres' })
  nombre: string;

  @ApiPropertyOptional({
    example: 'Entrega en cadena de frío para quesos y productos perecederos',
    maxLength: 255,
    description: 'Descripción visible para el cliente',
  })
  @IsOptional()
  @Transform(trim)
  @IsString({ message: 'descripcion debe ser un texto' })
  @MaxLength(255, { message: 'descripcion no puede superar los 255 caracteres' })
  descripcion?: string;

  @ApiProperty({ 
    enum: TipoEntrega, 
    example: TipoEntrega.DOMICILIO, 
    description: 'Tipo de entrega' })
  @IsEnum(TipoEntrega, { message: 'tipo no es válido' })
  tipo: TipoEntrega;

  @ApiProperty({ 
    example: 4990, 
    minimum: 0, 
    description: 'Costo del envío en pesos chilenos' })
  @Type(() => Number)
  @IsInt({ message: 'costo debe ser un número entero' })
  @Min(0, { message: 'costo no puede ser negativo' })
  costo: number;

  @ApiPropertyOptional({
    example: 50000,
    minimum: 1,
    description: 'Subtotal de productos desde el cual el envío es gratis',
  })
  @IsOptional( { message: 'costoGratisDesde es opcional' })
  @Type(() => Number)
  @IsInt({ message: 'costoGratisDesde debe ser un número entero' })
  @Min(1, { message: 'costoGratisDesde debe ser al menos 1' })
  costoGratisDesde?: number;

  @ApiProperty({ 
    example: 1, 
    minimum: 0, 
    description: 'Días hábiles mínimos estimados' })
  @Type(() => Number)
  @IsInt({ message: 'diasEstimadosMin debe ser un número entero' })
  @Min(0, { message: 'diasEstimadosMin no puede ser negativo' })
  diasEstimadosMin: number;

  @ApiProperty({ 
    example: 3, 
    minimum: 0, 
    description: 'Días hábiles máximos estimados' })
  @Type(() => Number)
  @IsInt({ message: 'diasEstimadosMax debe ser un número entero' })
  @Min(0, { message: 'diasEstimadosMax no puede ser negativo' })
  diasEstimadosMax: number;

  @ApiProperty({
    enum: TipoConservacion,
    isArray: true,
    description: 'Tipos de conservación que este método puede transportar',
  })
  @IsArray({ message: 'tiposConservacionPermitidos debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'Debes indicar al menos un tipo de conservación' })
  @ArrayUnique({ message: 'tiposConservacionPermitidos no puede tener valores repetidos' })
  @IsEnum(TipoConservacion, { each: true, message: 'tiposConservacionPermitidos contiene un valor inválido' })
  tiposConservacionPermitidos: TipoConservacion[];

  @ApiPropertyOptional({
    example: ['Providencia', 'Las Condes', 'Ñuñoa'],
    type: [String],
    description: 'Comunas con cobertura. Si se omite, cubre todo el país.',
  })
  @IsOptional( { message: 'comunasCobertura es opcional' })
  @IsArray({ message: 'comunasCobertura debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'comunasCobertura no puede estar vacío; omítelo para cubrir todo el país' })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => (typeof v === 'string' ? v.trim() : v)) : value,
  )
  @IsString({ each: true, message: 'Cada comuna debe ser un texto' })
  @IsNotEmpty({ each: true, message: 'Las comunas no pueden estar vacías' })
  @MaxLength(100, { each: true, message: 'Cada comuna no puede superar los 100 caracteres' })
  comunasCobertura?: string[];

  @ApiPropertyOptional({ 
    example: true, 
    default: true, 
    description: 'Indica si el método está disponible' })
  @IsOptional( { message: 'activo es opcional' })
  @IsBoolean({ message: 'activo debe ser verdadero o falso' })
  activo?: boolean;
}