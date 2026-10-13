
import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Injectable()
export class CheckoutService {
  create() {
    return {
      mensaje: 'Proceso de checkout iniciado correctamente (simulación)',
    };
  }
}
