import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTarjetaDto {
  @ApiProperty({
    description: 'Número de tarjeta de pago',
    example: '4111111111111111',
  })
  @IsString()
  @Matches(/^\d{13,19}$/, {
    message: 'El número de tarjeta debe contener entre 13 y 19 dígitos',
  })
  numero: string;

  @ApiProperty({
    description: 'Fecha de vencimiento en formato MM/AA',
    example: '12/28',
  })
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'El vencimiento debe tener el formato MM/AA',
  })
  vencimiento: string;

  @ApiProperty({
    description: 'Código de seguridad de la tarjeta',
    example: '123',
  })
  @IsString()
  @Matches(/^\d{3,4}$/, {
    message: 'El CVV debe contener 3 o 4 dígitos',
  })
  cvv: string;

  @ApiProperty({
    description: 'Nombre del titular de la tarjeta',
    example: 'Juan Perez',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'El nombre del titular no puede estar vacío',
  })
  nombre: string;
}
