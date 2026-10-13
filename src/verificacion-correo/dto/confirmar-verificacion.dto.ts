import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ConfirmarVerificacionDto {
  @ApiProperty({
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Token recibido al solicitar la verificación',
  })
  @IsUUID('all', { message: 'token debe ser un UUID válido' })
  token: string;
}
