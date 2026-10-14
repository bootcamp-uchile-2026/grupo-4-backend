import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoriaDto {
  @ApiProperty({
    example: 'Mermeladas',
    description: 'Nombre de la categoría',
    maxLength: 100,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)) // Eliminar espacios en blanco al inicio y al final
  @IsString({ message: 'nombre debe ser un texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'nombre no puede estar vacío' }) // Validar que no esté vacío
  @MaxLength(100, { message: 'nombre no puede superar los 100 caracteres' }) // Validar que no supere los 100 caracteres
  nombre: string;
}