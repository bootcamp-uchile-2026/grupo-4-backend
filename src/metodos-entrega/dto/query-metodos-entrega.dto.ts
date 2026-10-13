import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class MetodosEntregaQueryDto {
  @ApiPropertyOptional({
    default: false,
    description: 'Incluye los métodos desactivados (solo administradores)',
  })
  @IsOptional( { message: 'incluirInactivos es opcional' })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: 'incluirInactivos debe ser verdadero o falso' })
  incluirInactivos?: boolean;
}