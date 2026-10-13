import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateTiempoEntregaDto {
  @ApiProperty({
    example: '0f8fad5b-d9cb-469f-a165-70867728950e',
    description: 'ID de la zona de despacho a la que aplica el tiempo',
  })
  @IsUUID('all', { message: 'zonaId debe ser un UUID válido' })
  zonaId: string;

  @ApiProperty({
    example: 1,
    minimum: 0,
    description:
      'Días mínimos que demora la entrega. 0 es entrega el mismo día.',
  })
  @Type(() => Number)
  @IsInt({ message: 'diasMinimo debe ser un número entero' })
  @Min(0, { message: 'diasMinimo debe ser mayor o igual a 0' })
  diasMinimo: number;

  @ApiProperty({
    example: 3,
    minimum: 0,
    description:
      'Días máximos que demora la entrega. No puede ser menor que diasMinimo.',
  })
  @Type(() => Number)
  @IsInt({ message: 'diasMaximo debe ser un número entero' })
  @Min(0, { message: 'diasMaximo debe ser mayor o igual a 0' })
  diasMaximo: number;
}
