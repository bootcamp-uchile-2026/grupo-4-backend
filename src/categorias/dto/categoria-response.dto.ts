import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoriaResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único de la categoría',
  })
  @Type(() => Number) // Transformar el valor a número
  @IsInt({ message: 'id debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'id debe ser mayor que 0' }) // Validar que sea un número positivo
  id: number;

  @ApiProperty({
    example: 'Mermeladas',
    description: 'Nombre de la categoría',
  })
  @IsString({ message: 'nombre debe ser una cadena de texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'nombre no debe estar vacío' }) // Validar que no esté vacío
  nombre: string;
}