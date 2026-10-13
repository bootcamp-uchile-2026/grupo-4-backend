import { PartialType } from '@nestjs/swagger';
import { CreateSeguimientoDespachoDto } from './create-seguimiento-despacho.dto';

export class UpdateSeguimientoDespachoDto extends PartialType(
  CreateSeguimientoDespachoDto,
) {}
