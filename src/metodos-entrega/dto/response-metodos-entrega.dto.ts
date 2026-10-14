import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, } from 'class-validator';
import { TipoEntrega } from '../enum/tipos-entrega.enum';
import { TipoConservacion } from '../../productos/enums/tipo-conservacion.enum'; // ajusta la ruta

export class MetodoEntregaResponseDto {
  @ApiProperty({ 
    example: 1, 
    minimum: 1, 
    description: 'Identificador único del método de entrega' 
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
    example: 'Entrega en cadena de frío', 
    nullable: true, 
    description: 'Descripción' 
  })
  @IsOptional({ message: 'descripcion es opcional' }) 
  @IsString({ message: 'descripcion debe ser un texto' })
  descripcion: string | null;

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
    description: 'Costo base del envío' 
  })
  @IsInt({ message: 'costo debe ser un número entero' }) 
  @Min(0, { message: 'costo debe ser mayor o igual a 0' })
  costo: number;

  @ApiProperty({ 
    example: 50000, 
    nullable: true, 
    description: 'Subtotal desde el cual el envío es gratis' 
  })
  @IsOptional({ message: 'costoGratisDesde es opcional' }) 
  @IsInt({ message: 'costoGratisDesde debe ser un número entero' })
  costoGratisDesde: number | null;

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
    enum: TipoConservacion, 
    isArray: true, 
    description: 'Conservación admitida' 
  })
  @IsArray({ message: 'tiposConservacionPermitidos debe ser un arreglo' }) 
  @IsEnum(TipoConservacion, { each: true, message: 'tiposConservacionPermitidos contiene un valor inválido' })
  tiposConservacionPermitidos: TipoConservacion[];

  @ApiProperty({
    type: [String],
    nullable: true,
    example: ['Providencia', 'Las Condes'],
    description: 'Comunas con cobertura (null = todo el país)',
  })
  @IsOptional({ message: 'comunasCobertura es opcional' }) 
  @IsArray({ message: 'comunasCobertura debe ser un arreglo' }) 
  @IsString({ each: true, message: 'Cada comuna debe ser un texto' })
  comunasCobertura: string[] | null;

  @ApiProperty({ 
    example: true, 
    description: 'Indica si el método está disponible' 
  })
  @IsBoolean({ message: 'activo debe ser verdadero o falso' } )
  activo: boolean;
}