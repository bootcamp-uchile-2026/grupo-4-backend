import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateDatosFacturacionDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo para la facturación',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  nombreCompleto: string;

  @ApiProperty({
    example: '12.345.678-5',
    description: 'RUT de la persona que solicita la facturación',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  rut: string;

  @ApiProperty({
    example: 'Av. Providencia 1234, Santiago',
    description: 'Dirección de facturación',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/)
  direccion: string;
}
