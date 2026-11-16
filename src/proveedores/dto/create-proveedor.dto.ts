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
  @ApiProperty({ example: 'Mermeladas del Valle' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  @MaxLength(150)
  nombre: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  @MaxLength(100)
  nombreResponsable: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  @MaxLength(100)
  apellido: string;

  @ApiProperty({ example: 'Productor artesanal de mermeladas.' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  descripcion: string;

  @ApiProperty({ example: 'contacto@mermeladasdelvalle.cl' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(190)
  email: string;

  @ApiProperty({ example: '+56912345678' })
  @IsString()
  @Matches(/^\+569\d{8}$/)
  telefono: string;

  @ApiProperty({
    example: 'MiPassword123!',
    minLength: 8,
    maxLength: 72,
    writeOnly: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
