import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del usuario',
  })
  id: string;

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
}