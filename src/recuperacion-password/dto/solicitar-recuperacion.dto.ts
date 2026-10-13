import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SolicitarRecuperacionDto {
  @ApiProperty({
    example: 'camilo@example.com',
    description: 'Correo electrónico de la cuenta que se quiere recuperar',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email no puede estar vacío' })
  email: string;
}
