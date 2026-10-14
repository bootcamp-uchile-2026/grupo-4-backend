import { PartialType } from '@nestjs/swagger';
import { CreateConfirmacionCompraDto } from './create-confirmacion-compra.dto';

export class UpdateConfirmacionCompraDto extends PartialType(CreateConfirmacionCompraDto) {}
