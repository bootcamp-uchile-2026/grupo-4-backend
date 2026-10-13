import { PartialType } from '@nestjs/swagger';
import { CreateTiempoEntregaDto } from './create-tiempo-entrega.dto';

export class UpdateTiempoEntregaDto extends PartialType(
  CreateTiempoEntregaDto,
) {}
