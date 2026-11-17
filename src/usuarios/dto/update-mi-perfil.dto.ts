import { PickType } from '@nestjs/swagger';
import { UpdateUsuarioDto } from './update-usuario.dto';

export class UpdateMiPerfilDto extends PickType(UpdateUsuarioDto, [
  'nombre',
  'apellido',
  'telefono',
  'password',
] as const) {}