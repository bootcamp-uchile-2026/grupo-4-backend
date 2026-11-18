import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class SeguimientoDespachoQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Filtrar seguimientos por ID del despacho',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'despachoId debe ser un entero' })
  despachoId?: number;
}
