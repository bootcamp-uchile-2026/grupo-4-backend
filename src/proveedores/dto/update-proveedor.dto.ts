import { PartialType, PickType } from '@nestjs/swagger';
import { CreateProveedorDto } from './create-proveedor.dto';

export class UpdateProveedorDto extends PartialType(
  PickType(CreateProveedorDto, [
    'nombre',
    'descripcion',
    'email',
    'telefono',
  ] as const),
) {}
