import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Camilo',
    description: 'Nombre del usuario',
  })
  @IsString({ message: 'nombre debe ser un texto' })
  @IsNotEmpty({ message: 'nombre no puede estar vacío' })
  @Matches(/\S/, {
    message: 'nombre no puede contener solo espacios',
  })
  nombre: string;

  @ApiProperty({
    example: 'Díaz',
    description: 'Apellido del usuario',
  })
  @IsString({ message: 'apellido debe ser un texto' })
  @IsNotEmpty({ message: 'apellido no puede estar vacío' })
  @Matches(/\S/, {
    message: 'apellido no puede contener solo espacios',
  })
  apellido: string;

  @ApiProperty({
    example: 'camilo@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email no puede estar vacío' })
  email: string;

  @ApiProperty({
    example: '+56912345678',
    description: 'Número de teléfono del usuario',
  })
  @IsString({ message: 'telefono debe ser un texto' })
  @IsNotEmpty({ message: 'telefono no puede estar vacío' })
  @Matches(/^\+569\d{8}$/, {
    message:
      'telefono debe tener un formato válido de teléfono chileno (+569XXXXXXXX)',
  })
  telefono: string;

  @ApiProperty({
    example: 'MiPassword123!',
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 72,
  })
  @IsString({ message: 'password debe ser un texto' })
  @IsNotEmpty({ message: 'password no puede estar vacío' })
  @MinLength(8, {
    message: 'password debe tener al menos 8 caracteres',
  })
  @MaxLength(72, {
    message: 'password no puede superar los 72 caracteres',
  })
  password: string;
}
