import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateDireccionDto {
  @ApiProperty({
    example: 'Av. Providencia',
    description: 'Nombre de la calle',
    maxLength: 150,
  })
  @Transform(trim) // Elimina espacios en los extremos antes de validar
  @IsString({ message: 'calle debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'calle no puede estar vacía' }) // Validar que no esté vacía
  @MaxLength(150, { message: 'calle no puede superar los 150 caracteres' }) // Validar que no supere los 150 caracteres
  calle: string;

  @ApiProperty({
    example: '1234',
    description: 'Número de la dirección',
    maxLength: 20,
  })
  @Transform(trim) // Elimina espacios en los extremos antes de validar
  @IsString({ message: 'numero debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'numero no puede estar vacío' }) // Validar que no esté vacío
  @MaxLength(20, { message: 'numero no puede superar los 20 caracteres' }) // Validar que no supere los 20 caracteres
  numero: string;

  @ApiProperty({
    example: 'Providencia',
    description: 'Comuna de la dirección',
    maxLength: 100,
  })
  @Transform(trim) // Elimina espacios en los extremos antes de validar
  @IsString({ message: 'comuna debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'comuna no puede estar vacía' }) // Validar que no esté vacía
  @MaxLength(100, { message: 'comuna no puede superar los 100 caracteres' }) // Validar que no supere los 100 caracteres
  comuna: string;

  @ApiProperty({
    example: 'Santiago',
    description: 'Ciudad de la dirección',
    maxLength: 100,
  })
  @Transform(trim) // Elimina espacios en los extremos antes de validar
  @IsString({ message: 'ciudad debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'ciudad no puede estar vacía' }) // Validar que no esté vacía
  @MaxLength(100, { message: 'ciudad no puede superar los 100 caracteres' }) // Validar que no supere los 100 caracteres
  ciudad: string;

  @ApiProperty({
    example: 'Región Metropolitana',
    description: 'Región de la dirección',
    maxLength: 100,
  })
  @Transform(trim) // Elimina espacios en los extremos antes de validar
  @IsString({ message: 'region debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'region no puede estar vacía' }) // Validar que no esté vacía
  @MaxLength(100, { message: 'region no puede superar los 100 caracteres' }) // Validar que no supere los 100 caracteres
  region: string;
}
