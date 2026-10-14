
import { Injectable } from '@nestjs/common';
import { ConfirmacionCompraResponseDto } from './dto/confirmacion-compra-response.dto';

@Injectable()
export class ConfirmacionCompraService {
  create(): ConfirmacionCompraResponseDto {
    return {
      numeroPedido: 12345,
      mensaje: '¡Gracias por tu compra!',
      detalleEmail:
        'Te enviaremos un email con los detalles de tu pedido.',
      entregaEstimada: 'Jueves 22 de agosto',
      direccion: 'Av. El Bosque 123, Santiago',
      acciones: ['Ver mi pedido', 'Volver al inicio'],
    };
  }
}
