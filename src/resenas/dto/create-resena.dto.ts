import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateResenaDto {
  @ApiProperty({
    example: 1,
    description: 'Id del cliente asociado a la reseña',
  })
  @Type(() => Number)
  @IsInt({ message: 'clienteId debe ser un número entero' })
  @Min(1, { message: 'clienteId debe ser mayor o igual a 1' })
  clienteId: number;

  @ApiProperty({
    example: 2,
    description: 'Id del producto asociado a la reseña',
  })
  @Type(() => Number)
  @IsInt({ message: 'productoId debe ser un número entero' })
  @Min(1, { message: 'productoId debe ser mayor o igual a 1' })
  productoId: number;

  @ApiProperty({
    example: 'El mejor producto de la vida',
    description: 'Título de la reseña',
  })
  @IsString({ message: 'titulo debe ser un texto' })
  @IsNotEmpty({ message: 'titulo no puede estar vacío' })
  @Matches(/\S/, {
    message: 'titulo no puede contener solo espacios',
  })
  titulo: string;

  @ApiPropertyOptional({
    example: 'Este producto me ha ayudado con...',
    description: 'Detalle opcional de la reseña',
  })
  @IsOptional()
  @IsString({ message: 'detalle debe ser un texto' })
  @Matches(/\S/, {
    message: 'detalle no puede contener solo espacios',
  })
  detalle?: string;

  @ApiProperty({
    example: 3,
    minimum: 1,
    maximum: 5,
    description: 'Rating asociado a la reseña. De 1 a 5 estrellas.',
  })
  @Type(() => Number)
  @IsInt({ message: 'estrellas debe ser un número entero' })
  @Min(1, { message: 'estrellas debe ser mayor o igual a 1' })
  @Max(5, { message: 'estrellas debe ser menor o igual a 5' })
  estrellas: number;
}
