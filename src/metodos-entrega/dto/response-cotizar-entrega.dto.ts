import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TipoEntrega } from '../enum/tipos-entrega.enum';

export class MetodoEntregaCotizadoDto {
  @ApiProperty({ 
    example: 1, minimum: 1, 
    description: 'Identificador del método de entrega' 
  })
  @IsInt( { message: 'id debe ser un número entero' }) 
  @IsPositive({ message: 'id debe ser un número positivo' })
  id: number;

  @ApiProperty({ 
    example: 'Despacho refrigerado', 
    description: 'Nombre del método' 
  })
  @IsString({ message: 'nombre debe ser un texto' }) 
  @IsNotEmpty({ message: 'nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({ 
    enum: TipoEntrega, 
    example: TipoEntrega.DOMICILIO, 
    description: 'Tipo de entrega' 
  })
  @IsEnum(TipoEntrega, { message: 'tipo debe ser un valor válido de TipoEntrega' })
  tipo: TipoEntrega;

  @ApiProperty({ 
    example: 4990, 
    minimum: 0, 
    description: 'Costo final aplicado (0 si es gratis)' 
  })
  @IsInt({ message: 'costo debe ser un número entero' }) 
  @Min(0, { message: 'costo debe ser mayor o igual a 0' })
  costo: number;

  @ApiProperty({ 
    example: false, 
    description: 'Indica si el envío es gratis por el monto de la compra' 
  })
  @IsBoolean({ message: 'gratis debe ser un valor booleano' })
  gratis: boolean;

  @ApiProperty({ 
    example: 1, 
    minimum: 0, 
    description: 'Días hábiles mínimos estimados' 
  })
  @IsInt({ message: 'diasEstimadosMin debe ser un número entero' }) 
  @Min(0, { message: 'diasEstimadosMin debe ser mayor o igual a 0' })
  diasEstimadosMin: number;

  @ApiProperty({ 
    example: 3, 
    minimum: 0, 
    description: 'Días hábiles máximos estimados' 
  })
  @IsInt({ message: 'diasEstimadosMax debe ser un número entero' }) 
  @Min(0, { message: 'diasEstimadosMax debe ser mayor o igual a 0' })
  diasEstimadosMax: number;

  @ApiProperty({ 
    example: true, 
    description: 'Indica si el método sirve para estos productos y esta comuna' 
  })
  @IsBoolean({ message: 'disponible debe ser un valor booleano' })
  disponible: boolean;

  @ApiProperty({
    example: null,
    nullable: true,
    description: 'Motivo por el que el método no está disponible (null si lo está)',
  })
  @IsOptional({ message: 'motivoNoDisponible es opcional' }) 
  @IsString({ message: 'motivoNoDisponible debe ser un texto' })
  motivoNoDisponible: string | null;
}

export class CotizacionEntregaResponseDto {
  @ApiProperty({ 
    example: 36970, 
    minimum: 0, 
    description: 'Subtotal de los productos cotizados' 
  })
  @IsInt({ message: 'subtotalProductos debe ser un número entero' }) 
  @Min(0, { message: 'subtotalProductos debe ser mayor o igual a 0' })
  subtotalProductos: number;

  @ApiProperty({ 
    type: () => [MetodoEntregaCotizadoDto], 
    description: 'Métodos evaluados' 
  })
  @IsArray({ message: 'metodos debe ser un arreglo' }) 
  @ValidateNested({ each: true }) 
  @Type(() => MetodoEntregaCotizadoDto)
  metodos: MetodoEntregaCotizadoDto[];
}