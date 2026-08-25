import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'Camilo',
    description: 'Nombre del usuario',
  })
  nombre: string;

  @ApiProperty({
    example: 'Díaz',
    description: 'Apellido del usuario',
  })
  apellido: string;

  @ApiProperty({
    example: 'camilo@example.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @ApiProperty({
    example: '+56912345678',
    description: 'Número de teléfono del usuario',
  })
  telefono: string;

  @ApiProperty({
    example: 'MiPassword123!',
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 72,
  })
  password: string;
}