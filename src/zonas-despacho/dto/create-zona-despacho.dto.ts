import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateZonaDespachoDto {
  @ApiProperty({
    example: 'Santiago Oriente',
    description: 'Nombre de la zona de despacho. Debe ser único.',
  })
  @IsString({ message: 'nombre debe ser un texto' })
  @IsNotEmpty({ message: 'nombre no puede estar vacío' })
  @Matches(/\S/, {
    message: 'nombre no puede contener solo espacios',
  })
  nombre: string;

  @ApiProperty({
    type: [String],
    example: ['Las Condes', 'Vitacura', 'La Reina'],
    minItems: 1,
    description: 'Comunas que cubre la zona',
  })
  @IsArray({ message: 'comunas debe ser una lista' })
  @ArrayNotEmpty({ message: 'comunas debe tener al menos una comuna' })
  @IsString({ each: true, message: 'cada comuna debe ser un texto' })
  @IsNotEmpty({ each: true, message: 'ninguna comuna puede estar vacía' })
  comunas: string[];

  @ApiProperty({
    example: 3990,
    minimum: 0,
    description: 'Costo de envío a la zona',
  })
  @Type(() => Number)
  @IsInt({ message: 'costoEnvio debe ser un número entero' })
  @Min(0, { message: 'costoEnvio debe ser mayor o igual a 0' })
  costoEnvio: number;
}
