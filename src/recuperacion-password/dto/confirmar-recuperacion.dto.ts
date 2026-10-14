import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ConfirmarRecuperacionDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Token recibido al solicitar la recuperación',
  })
  @IsUUID('all', { message: 'token debe ser un UUID válido' })
  token: string;

  @ApiProperty({
    example: 'NuevaPassword456!',
    description: 'Nueva contraseña de la cuenta',
    minLength: 8,
    maxLength: 72,
  })
  @IsString({ message: 'nuevaPassword debe ser un texto' })
  @IsNotEmpty({ message: 'nuevaPassword no puede estar vacío' })
  @MinLength(8, {
    message: 'nuevaPassword debe tener al menos 8 caracteres',
  })
  @MaxLength(72, {
    message: 'nuevaPassword no puede superar los 72 caracteres',
  })
  nuevaPassword: string;
}
