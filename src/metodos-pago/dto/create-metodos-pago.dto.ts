import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateMetodoPagoDto {
  @ApiProperty({
    example: 'tok_abc123',
    description:
      'Token temporal generado por la pasarela en el cliente. Nunca envíes el número de la tarjeta ni el CVV.',
    maxLength: 255,
  })
  @IsString({ message: 'tokenPasarela debe ser un texto' })
  @IsNotEmpty({ message: 'tokenPasarela es obligatorio' })
  @MaxLength(255, { message: 'tokenPasarela no puede superar los 255 caracteres' })
  tokenPasarela: string;

  @ApiPropertyOptional({
    example: 'Tarjeta personal',
    description: 'Nombre para identificar la tarjeta',
    maxLength: 50,
  })
  @IsOptional({ message: 'alias es opcional' })
  @Transform(trim)
  @IsString({ message: 'alias debe ser un texto' })
  @IsNotEmpty({ message: 'alias no puede estar vacío' })
  @MaxLength(50, { message: 'alias no puede superar los 50 caracteres' })
  alias?: string;

  @ApiPropertyOptional({
    example: false,
    default: false,
    description: 'Marca esta tarjeta como la predeterminada',
  })
  @IsOptional({ message: 'esPredeterminado es opcional' })
  @IsBoolean({ message: 'esPredeterminado debe ser verdadero o falso' })
  esPredeterminado?: boolean;
}