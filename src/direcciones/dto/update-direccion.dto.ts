import { PartialType } from '@nestjs/swagger';
import { CreateDireccionDto } from './create-direccion.dto';

export class UpdateDireccioneDto extends PartialType(CreateDireccionDto) {}
