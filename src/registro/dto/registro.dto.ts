import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUsuarioDto } from '../../usuarios/dto/create-usuario.dto';

export class RegistroDto extends CreateUsuarioDto {
  @ApiProperty({
    example: 'MiPassword123!',
    description: 'Repetición de la contraseña. Debe ser igual a password.',
  })
  @IsString({ message: 'confirmarPassword debe ser un texto' })
  @IsNotEmpty({ message: 'confirmarPassword no puede estar vacío' })
  confirmarPassword: string;
}
