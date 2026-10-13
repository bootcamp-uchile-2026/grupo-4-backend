
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @ApiOperation({
    summary: 'Iniciar proceso de compra',
    description:
      'Inicia una simulación del proceso de checkout. No requiere body en esta etapa.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Proceso de checkout iniciado correctamente (simulación).',
    schema: {
      example: {
        mensaje: 'Proceso de checkout iniciado correctamente (simulación)',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud inválida.',
  })
  @Post()
  create() {
    return this.checkoutService.create();
  }
}
