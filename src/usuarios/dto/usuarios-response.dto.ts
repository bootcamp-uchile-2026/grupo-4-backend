import { ApiProperty } from '@nestjs/swagger';
import { RolUsuario } from '../enums/rol-usuario.enum';

export class UsuarioResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del usuario',
  })
  id: number;

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
  telefono: string | null;

  @ApiProperty({
    enum: RolUsuario,
    example: RolUsuario.CLIENTE,
    description: 'Rol del usuario',
  })
  rol: RolUsuario;
}
