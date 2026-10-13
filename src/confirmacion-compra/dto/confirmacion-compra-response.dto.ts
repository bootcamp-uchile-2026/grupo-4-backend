import { ApiProperty } from '@nestjs/swagger';

export class ConfirmacionCompraResponseDto {
  @ApiProperty({
    example: 12345,
    description: 'Número de pedido simulado',
  })
  numeroPedido: number;

  @ApiProperty({
    example: '¡Gracias por tu compra!',
    description: 'Mensaje principal de confirmación',
  })
  mensaje: string;

  @ApiProperty({
    example: 'Te enviaremos un email con los detalles de tu pedido.',
    description: 'Información sobre el correo de confirmación',
  })
  detalleEmail: string;

  @ApiProperty({
    example: 'Jueves 22 de agosto',
    description: 'Fecha estimada de entrega de ejemplo',
  })
  entregaEstimada: string;

  @ApiProperty({
    example: 'Av. El Bosque 123, Santiago',
    description: 'Dirección de entrega de ejemplo',
  })
  direccion: string;

  @ApiProperty({
    example: ['Ver mi pedido', 'Volver al inicio'],
    description: 'Acciones de navegación que mostrará el frontend',
    type: [String],
  })
  acciones: string[];
}
