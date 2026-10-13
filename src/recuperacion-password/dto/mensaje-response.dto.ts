import { ApiProperty } from '@nestjs/swagger';

export class MensajeResponseDto {
  @ApiProperty({
    example: 'Contraseña actualizada correctamente.',
    description: 'Resultado de la operación',
  })
  mensaje: string;
}
