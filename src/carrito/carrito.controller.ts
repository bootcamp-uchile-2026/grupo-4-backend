import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartResponseDto } from './dto/cart-response.dto';
import { CartItemResponseDto } from './dto/cart-item-response.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

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
  

  @ApiOperation({
    summary: 'Agregar producto al carrito',
    description: 'Agrega un producto al carrito del usuario.',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto agregado correctamente al carrito.',
    type: CartItemResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos enviados no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'El producto no existe.',
  })
  @Post('items')
  addItem(
    @Body() addCartItemDto: AddCartItemDto,
  ): CartItemResponseDto {
    return {} as CartItemResponseDto;
  }


  @ApiOperation({
    summary: 'Actualizar cantidad de producto',
    description: 'Actualiza la cantidad de un producto existente en el carrito.',
  })
  @ApiParam({
    name: 'itemId',
    type: Number,
    example: 4,
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Cantidad del producto actualizada correctamente.',
    type: CartItemResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos enviados no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'El producto no existe en el carrito.',
  })
  @Put('items/:itemId')
  updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): CartItemResponseDto {
    return {} as CartItemResponseDto;
  }


  @ApiOperation({
    summary: 'Eliminar producto del carrito',
    description: 'Elimina un producto específico del carrito.',
  })
  @ApiParam({
    name: 'itemId',
    type: Number,
    example: 1,
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado correctamente del carrito.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'El producto no existe en el carrito.',
  })
  @Delete('items/:itemId')
  removeItem(
    @Param('itemId', ParseIntPipe) itemId: number,
  ): void {}


  @ApiOperation({
    summary: 'Vaciar carrito',
    description: 'Elimina todos los productos del carrito del usuario.',
  })
  @ApiResponse({
    status: 204,
    description: 'Carrito vaciado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado.',
  })
  @Delete()
  removeCart(): void {}


}
