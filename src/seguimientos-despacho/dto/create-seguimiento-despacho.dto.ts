import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { EstadoSeguimiento } from '../enums/estado-seguimiento.enum';

export class CreateSeguimientoDespachoDto {
  @ApiProperty({
    example: 'a3bb189e-8bf9-4888-9912-ace4e6543002',
    description: 'ID del despacho al que pertenece el seguimiento',
  })
  @IsUUID('all', { message: 'despachoId debe ser un UUID válido' })
  despachoId: string;

  @ApiProperty({
    enum: EstadoSeguimiento,
    example: EstadoSeguimiento.EN_TRANSITO,
    description: 'Estado en que quedó el despacho con este avance',
  })
  @IsEnum(EstadoSeguimiento, {
    message:
      'estado debe ser EN_PREPARACION, DESPACHADO, EN_TRANSITO, EN_REPARTO, ENTREGADO o ENTREGA_FALLIDA',
  })
  estado: EstadoSeguimiento;

  @ApiProperty({
    example: 'El pedido va camino al centro de distribución.',
    description: 'Detalle del avance del despacho',
  })
  @IsString({ message: 'descripcion debe ser un texto' })
  @IsNotEmpty({ message: 'descripcion no puede estar vacía' })
  @Matches(/\S/, {
    message: 'descripcion no puede contener solo espacios',
  })
  descripcion: string;
}
