import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class DireccionResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único de la dirección',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'id debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'id debe ser un número positivo' }) // Validar que sea un número positivo
  @MinLength(1, { message: 'id debe tener al menos 1 carácter' }) // Validar que tenga al menos 1 carácter
  id: number;

  @ApiProperty({
    example: 'Av. Providencia',
    description: 'Nombre de la calle',
  })
  @IsString({ message: 'calle debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'calle no puede estar vacía' }) // Validar que no esté vacía
  calle: string;

  @ApiProperty({
    example: '1234',
    description: 'Número de la dirección',
  })
  @IsString({ message: 'numero debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'numero no puede estar vacío' }) // Validar que no esté vacío
  numero: string;

  @ApiProperty({
    example: 'Providencia',
    description: 'Comuna de la dirección',
  })
  @IsString({ message: 'comuna debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'comuna no puede estar vacía' }) // Validar que no esté vacía
  comuna: string;

  @ApiProperty({
    example: 'Santiago',
    description: 'Ciudad de la dirección',
  })
  @IsString({ message: 'ciudad debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'ciudad no puede estar vacía' }) // Validar que no esté vacía
  ciudad: string;

  @ApiProperty({
    example: 'Región Metropolitana',
    description: 'Región de la dirección',
  })
  @IsString({ message: 'region debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'region no puede estar vacía' }) // Validar que no esté vacía
  region: string;
}