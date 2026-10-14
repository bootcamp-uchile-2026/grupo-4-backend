import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ZonaDespachoQueryDto {
  @ApiPropertyOptional({
    example: true,
    description:
      'Filtrar por estado: true para las activas, false para las deshabilitadas',
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsOptional()
  @IsBoolean({ message: 'activa debe ser un booleano' })
  activa?: boolean;
}
