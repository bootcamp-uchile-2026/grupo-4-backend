import { PartialType } from '@nestjs/swagger';
import { CreateMetodosEntregaDto } from './create-metodos-entrega.dto';

export class UpdateMetodosEntregaDto extends PartialType(CreateMetodosEntregaDto) {}
