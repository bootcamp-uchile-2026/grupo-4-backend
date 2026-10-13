import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class TiempoEntregaQueryDto {
  @ApiPropertyOptional({
    example: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    description: 'Filtrar tiempos de entrega por ID de la zona de despacho',
  })
  @IsOptional()
  @IsUUID('all', { message: 'zonaId debe ser un UUID válido' })
  zonaId?: string;
}
