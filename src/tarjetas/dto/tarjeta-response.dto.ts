
import { ApiProperty } from '@nestjs/swagger';

export class TarjetaResponseDto {
  @ApiProperty({
    description: 'Identificador de la operación simulada',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del titular de la tarjeta',
    example: 'Juan Perez',
  })
  nombre: string;

  @ApiProperty({
    description: 'Últimos cuatro dígitos de la tarjeta',
    example: '1111',
  })
  ultimosDigitos: string;

  @ApiProperty({
    description: 'Resultado simulado del procesamiento',
    example: 'Tarjeta procesada correctamente',
  })
  mensaje: string;
}
