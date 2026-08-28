import { ApiProperty } from '@nestjs/swagger';

export class CreateProveedorDto {
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

  @ApiProperty({
    example: 'MiPassword123!',
    description: 'Contraseña del proveedor',
    minLength: 8,
    maxLength: 72,
  })
  password: string;
}
