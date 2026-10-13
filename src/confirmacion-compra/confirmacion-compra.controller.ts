
import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfirmacionCompraService } from './confirmacion-compra.service';
import { ConfirmacionCompraResponseDto } from './dto/confirmacion-compra-response.dto';

@ApiTags('Confirmación de compra')
@Controller('confirmacion-compra')
export class ConfirmacionCompraController {
  constructor(
    private readonly confirmacionCompraService: ConfirmacionCompraService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Confirmar compra',
    description:
      'Devuelve una confirmación de compra simulada según el wireframe. No registra pedidos ni procesa pagos reales.',
  })
  @ApiResponse({
    status: 201,
    description: 'Confirmación simulada generada correctamente.',
    type: ConfirmacionCompraResponseDto,
  })
  create(): ConfirmacionCompraResponseDto {
    return this.confirmacionCompraService.create();
  }
}
