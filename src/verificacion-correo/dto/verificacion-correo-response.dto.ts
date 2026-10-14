import { ApiProperty } from '@nestjs/swagger';

export class VerificacionCorreoResponseDto {
  @ApiProperty({
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Identificador único de la verificación',
  })
  id: string;

  @ApiProperty({
    example: 'javiera@example.com',
    description: 'Correo electrónico que se está verificando',
  })
  email: string;

  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description:
      'Token para confirmar la verificación. Se devuelve en la respuesta porque todavía no hay envío de correos.',
  })
  token: string;

  @ApiProperty({
    example: '2026-10-13T15:30:00.000Z',
    description: 'Fecha y hora en que el token deja de servir',
  })
  expiraEn: Date;

  @ApiProperty({
    example: false,
    description: 'Indica si el correo ya fue verificado',
  })
  verificado: boolean;
}
