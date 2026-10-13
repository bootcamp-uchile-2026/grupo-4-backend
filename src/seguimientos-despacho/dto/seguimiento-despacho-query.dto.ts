import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class SeguimientoDespachoQueryDto {
  @ApiPropertyOptional({
    example: 'a3bb189e-8bf9-4888-9912-ace4e6543002',
    description: 'Filtrar seguimientos por ID del despacho',
  })
  @IsOptional()
  @IsUUID('all', { message: 'despachoId debe ser un UUID válido' })
  despachoId?: string;
}
