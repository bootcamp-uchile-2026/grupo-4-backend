import { ApiProperty } from '@nestjs/swagger';

export class ProveedorResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único del proveedor',
  })
  id: number;

  @ApiProperty({
    example: 'Mermeladas del Valle',
    description: 'Nombre del proveedor',
  })
  nombre: string;

  @ApiProperty({
    example:
      'Productor artesanal de mermeladas elaboradas con frutas de la zona central.',
    description: 'Descripción del proveedor',
  })
  descripcion: string;

  @ApiProperty({
    example: 'contacto@mermeladasdelvalle.cl',
    description: 'Correo electrónico del proveedor',
  })
  email: string;

  @ApiProperty({
    example: '+56912345678',
    description: 'Número de teléfono del proveedor',
  })
  telefono: string;
}