import { ApiProperty } from '@nestjs/swagger';

export class EstadoVerificacionResponseDto {
  @ApiProperty({
    example: 'camilo@example.com',
    description: 'Correo electrónico consultado',
  })
  email: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el correo ya fue verificado',
  })
  verificado: boolean;
}
