import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartResponseDto } from './dto/cart-response.dto';

@ApiTags('Carrito')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @ApiOperation({
    summary: 'Obtener carrito',
    description: 'Obtiene el carrito actual del usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'Carrito obtenido correctamente.',
    type: CartResponseDto,
  })
  @Get()
  findCart(): CartResponseDto {
    return {} as CartResponseDto;
  }
  
}
