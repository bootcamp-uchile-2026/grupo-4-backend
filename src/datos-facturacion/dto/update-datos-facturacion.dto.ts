import { PartialType } from '@nestjs/swagger';
import { CreateDatosFacturacionDto } from './create-datos-facturacion.dto';

export class UpdateDatosFacturacionDto extends PartialType(CreateDatosFacturacionDto) {}
