import { PartialType } from '@nestjs/swagger';
import { CreateZonaDespachoDto } from './create-zona-despacho.dto';
export class UpdateZonaDespachoDto extends PartialType(CreateZonaDespachoDto) {}
