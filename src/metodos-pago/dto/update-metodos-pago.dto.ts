import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class UpdateMetodoPagoDto {
  @ApiPropertyOptional({
    example: 'Tarjeta del trabajo',
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
    example: true,
    description: 'Marca esta tarjeta como la predeterminada',
  })
  @IsOptional({ message: 'esPredeterminado es opcional' })
  @IsBoolean({ message: 'esPredeterminado debe ser verdadero o falso' })
  esPredeterminado?: boolean;
}