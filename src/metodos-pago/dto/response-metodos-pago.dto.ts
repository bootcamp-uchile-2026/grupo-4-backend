import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsPositive, IsString, Length, Max, Min, } from 'class-validator';
import { MarcaTarjeta } from '../enum/metodos-pago.enum';

export class MetodoPagoResponseDto {
  @ApiProperty({ 
    example: 1, 
    minimum: 1, 
    description: 'Identificador único del método de pago' 
  })
  @IsInt( { message: 'id debe ser un número entero' })
  @IsPositive({ message: 'id debe ser un número positivo' })
  id: number;

  @ApiProperty({ 
    example: 'Tarjeta personal', 
    nullable: true, 
    description: 'Nombre de la tarjeta' 
  })
  @IsOptional({ message: 'alias es opcional' })
  @IsString({ message: 'alias debe ser un texto' })
  alias: string | null;

  @ApiProperty({ 
    enum: MarcaTarjeta, 
    example: MarcaTarjeta.VISA, 
    description: 'Marca de la tarjeta' 
  })
  @IsEnum(MarcaTarjeta, { message: 'marca debe ser un valor válido de MarcaTarjeta' })
  marca: MarcaTarjeta;

  @ApiProperty({ 
    example: '4242', 
    description: 'Últimos 4 dígitos de la tarjeta' 
  })
  @IsString({ message: 'ultimosCuatro debe ser un texto' })
  @Length(4, 4, { message: 'ultimosCuatro debe tener exactamente 4 caracteres' })
  ultimosCuatro: string;

  @ApiProperty({ 
    example: 12, 
    minimum: 1, 
    maximum: 12, 
    description: 'Mes de vencimiento' 
  })
  @IsInt({ message: 'mesExpiracion debe ser un número entero' })
  @Min(1, { message: 'mesExpiracion debe ser al menos 1' })
  @Max(12, { message: 'mesExpiracion no puede ser mayor a 12' })
  mesExpiracion: number;

  @ApiProperty({ 
    example: 2029, 
    description: 'Año de vencimiento' 
  })
  @IsInt({ message: 'anioExpiracion debe ser un número entero' })
  anioExpiracion: number;

  @ApiProperty({ 
    example: 'MARIA GONZALEZ', 
    nullable: true, 
    description: 'Titular de la tarjeta' 
  })
  @IsOptional({ message: 'titular es opcional' })
  @IsString({ message: 'titular debe ser un texto' })
  titular: string | null;

  @ApiProperty({ 
    example: true, 
    description: 'Indica si es la tarjeta predeterminada' 
  })
  @IsBoolean({ message: 'esPredeterminado debe ser verdadero o falso' })
  esPredeterminado: boolean;

  @ApiProperty({ 
    example: false, 
    description: 'Indica si la tarjeta ya está vencida' 
  })
  @IsBoolean({ message: 'vencida debe ser verdadero o falso' })
  vencida: boolean;
}