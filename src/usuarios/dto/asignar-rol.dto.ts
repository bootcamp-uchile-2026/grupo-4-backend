import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RolUsuario } from '../enums/rol-usuario.enum';

export class AsignarRolDto {
  @ApiProperty({
    enum: RolUsuario,
    example: RolUsuario.PROVEEDOR,
    description: 'Rol que se asignará al usuario',
  })
  @IsEnum(RolUsuario, {
    message: 'rol debe ser CLIENTE, ADMIN o PROVEEDOR',
  })
  rol!: RolUsuario;
}
