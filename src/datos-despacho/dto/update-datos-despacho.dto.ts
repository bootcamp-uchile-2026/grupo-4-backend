import { PartialType } from '@nestjs/swagger';
import { CreateDatosDespachoDto } from './create-datos-despacho.dto';

export class UpdateDatosDespachoDto extends PartialType(CreateDatosDespachoDto) {}
