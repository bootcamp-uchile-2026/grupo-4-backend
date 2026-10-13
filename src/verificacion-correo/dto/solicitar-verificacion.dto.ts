import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SolicitarVerificacionDto {
  @ApiProperty({
    example: 'javiera@example.com',
    description: 'Correo electrónico que se quiere verificar',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email no puede estar vacío' })
  email: string;
}
