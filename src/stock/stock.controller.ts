import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StockResponseDto } from './dto/producto-response.dto';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiOperation({
    summary: 'Obtener stock de un producto',
    description: 'Obtiene la información de stock asociada a un producto.',
  })
  @ApiParam({
    name: 'productoId',
    type: String,
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Stock obtenido correctamente.',
    type: StockResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe stock asociado al producto.',
  })
  @Get(':productoId')
  findOne(
    @Param('productoId', ParseUUIDPipe) productoId: string,
  ): StockResponseDto {
    return this.stockService.findOne(productoId);
  }

  @ApiOperation({
    summary: 'Crear stock',
    description: 'Crea un registro de stock asociado a un producto.',
  })
  @ApiResponse({
    status: 201,
    description: 'Stock creado correctamente.',
    type: StockResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del stock no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'El producto no existe.',
  })
  @ApiResponse({
    status: 409,
    description: 'El producto ya tiene un registro de stock.',
  })
  @Post()
  create(
    @Body() createStockDto: CreateStockDto,
  ): StockResponseDto {
    return this.stockService.create(createStockDto);
  }

  @ApiOperation({
    summary: 'Actualizar stock',
    description: 'Actualiza la información de stock de un producto.',
  })
  @ApiParam({
    name: 'productoId',
    type: String,
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Stock actualizado correctamente.',
    type: StockResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos del stock no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe stock asociado al producto.',
  })
  @Patch(':productoId')
  update(
    @Param('productoId', ParseUUIDPipe) productoId: string,
    @Body() updateStockDto: UpdateStockDto,
  ): StockResponseDto {
    return this.stockService.update(productoId, updateStockDto);
  }

  @ApiOperation({
    summary: 'Eliminar stock',
    description: 'Elimina el registro de stock asociado a un producto.',
  })
  @ApiParam({
    name: 'productoId',
    type: String,
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 204,
    description: 'Stock eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe stock asociado al producto.',
  })
  @HttpCode(204)
  @Delete(':productoId')
  remove(
    @Param('productoId', ParseUUIDPipe) productoId: string,
  ): void {
    this.stockService.remove(productoId);
  }

  
}
