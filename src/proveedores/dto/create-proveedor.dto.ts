import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty({
    example: 'Mermeladas del Valle',
    description: 'Nombre del proveedor',
  })
  @IsString({ message: 'nombre debe ser un texto' })
  @IsNotEmpty({ message: 'nombre no puede estar vacío' })
  @Matches(/\S/, {
    message: 'nombre no puede contener solo espacios',
  })
  nombre: string;

  @ApiProperty({
    example:
      'Productor artesanal de mermeladas elaboradas con frutas de la zona central.',
    description: 'Descripción del proveedor',
  })
  @IsString({ message: 'descripcion debe ser un texto' })
  @IsNotEmpty({ message: 'descripcion no puede estar vacía' })
  @Matches(/\S/, {
    message: 'descripcion no puede contener solo espacios',
  })
  descripcion: string;

  @ApiProperty({
    example: 'contacto@mermeladasdelvalle.cl',
    description: 'Correo electrónico del proveedor',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email no puede estar vacío' })
  email: string;

  @ApiProperty({
    example: '+56912345678',
    description:
      'Número de teléfono del proveedor en formato internacional chileno',
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
    description: 'Contraseña del proveedor',
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
