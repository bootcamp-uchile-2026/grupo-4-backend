import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateZonaDespachoDto } from './create-zona-despacho.dto';

export class UpdateZonaDespachoDto extends PartialType(CreateZonaDespachoDto) {
  @ApiPropertyOptional({
    example: true,
    description: 'Estado de la zona: activa o deshabilitada',
  })
  @IsOptional()
  @IsBoolean({ message: 'activa debe ser un booleano' })
  activa?: boolean;
}
