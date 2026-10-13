import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EstadoVerificacionQueryDto {
  @ApiProperty({
    example: 'camilo@example.com',
    description: 'Correo electrónico que se quiere consultar',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email no puede estar vacío' })
  email: string;
}
