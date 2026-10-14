import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoDespacho } from '../enums/estado-despacho.enum';
import { CreateDespachoDto } from './create-despacho.dto';

export class UpdateDespachoDto extends PartialType(CreateDespachoDto) {
  @ApiPropertyOptional({
    enum: EstadoDespacho,
    example: EstadoDespacho.EN_CAMINO,
    description: 'Estado del despacho',
  })
  @IsOptional()
  @IsEnum(EstadoDespacho, {
    message:
      'estado debe ser PENDIENTE, EN_PREPARACION, EN_CAMINO, ENTREGADO o CANCELADO',
  })
  estado?: EstadoDespacho;
}
