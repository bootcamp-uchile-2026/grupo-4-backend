import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';
import { RolUsuario } from '../enums/rol-usuario.enum';

export class CreateUsuarioAdminDto extends CreateUsuarioDto {
  @ApiProperty({
    enum: RolUsuario,
    example: RolUsuario.ADMIN,
    description: 'Rol que tendrá el usuario',
  })
  @IsEnum(RolUsuario, {
    message: 'rol debe ser CLIENTE, ADMIN o PROVEEDOR',
  })
  rol: RolUsuario;
}
