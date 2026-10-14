import { PartialType } from '@nestjs/swagger';
import { CreateDatoDespachoDto } from './create-datos-despacho.dto';

export class UpdateDatosDespachoDto extends PartialType(CreateDatoDespachoDto) {}
