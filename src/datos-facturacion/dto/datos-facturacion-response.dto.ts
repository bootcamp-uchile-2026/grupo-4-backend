import { ApiProperty } from '@nestjs/swagger';

export class DatosFacturacionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Juan Pérez' })
  nombreCompleto: string;

  @ApiProperty({ example: '12.345.678-5' })
  rut: string;

  @ApiProperty({ example: 'Av. Providencia 1234, Santiago' })
  direccion: string;
}
