import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateDespachoDto {
  @ApiProperty({
    example: '0f8fad5b-d9cb-469f-a165-70867728950e',
    description: 'ID del pedido que se despacha',
  })
  @IsUUID('all', { message: 'pedidoId debe ser un UUID válido' })
  pedidoId: string;

  @ApiProperty({
    example: '9b2d5c1a-3e4f-4a6b-8c7d-0e1f2a3b4c5d',
    description: 'ID de la dirección de entrega',
  })
  @IsUUID('all', { message: 'direccionId debe ser un UUID válido' })
  direccionId: string;

  @ApiProperty({
    example: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    description: 'ID de la zona de despacho',
  })
  @IsUUID('all', { message: 'zonaId debe ser un UUID válido' })
  zonaId: string;
}
