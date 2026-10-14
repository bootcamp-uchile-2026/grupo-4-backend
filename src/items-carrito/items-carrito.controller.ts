import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemsCarritoService } from './items-carrito.service';
import { CreateItemsCarritoDto } from './dto/create-items-carrito.dto';
import { UpdateItemsCarritoDto } from './dto/update-items-carrito.dto';
import { ItemsCarritoResponseDto } from './dto/response-items-carrito.dto';
import { ItemsCarritoQueryDto } from './dto/query-items-carrito.dto';

@ApiTags('Items Carrito')
@Controller('carrito/items')
export class ItemsCarritoController {
  constructor(private readonly itemsCarritoService: ItemsCarritoService) {}

  @ApiOperation({
      summary: 'Obtener items del carrito',
      description: 'Obtiene una lista de items del carrito aplicando filtros opcionales.',
    })
    @ApiResponse({
      status: 200,
      description: 'Lista de items del carrito obtenida correctamente.',
      type: ItemsCarritoResponseDto,
      isArray: true,
    })
    @ApiResponse({
      status: 400,
      description: 'Los parámetros de búsqueda no son válidos.',
    })
  @Get()
  findAll(
    @Query() query: ItemsCarritoQueryDto,
  ): ItemsCarritoResponseDto[] {
    return []
  }

  @ApiOperation({
    summary: 'Obtener item del carrito por ID',
    description: 'Obtiene un item específico del carrito por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Item del carrito obtenido correctamente.',
    type: ItemsCarritoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): ItemsCarritoResponseDto {
    return {} as ItemsCarritoResponseDto;
  }

  @ApiOperation({
    summary: 'Crear item en el carrito',
    description: 'Crea un nuevo item en el carrito.',
  })
  @ApiResponse({
    status: 201,
    description: 'Item del carrito creado correctamente.',
    type: ItemsCarritoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos proporcionados no son válidos.',
  })
  @Post()
  create(
    @Body() createItemsCarritoDto: CreateItemsCarritoDto,
  ): ItemsCarritoResponseDto {
    return {} as ItemsCarritoResponseDto;
  }

  @ApiOperation({
    summary: 'Actualizar item en el carrito',
    description: 'Actualiza un item existente en el carrito por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Item del carrito actualizado correctamente.',
    type: ItemsCarritoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos proporcionados no son válidos.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemsCarritoDto: UpdateItemsCarritoDto,
  ): ItemsCarritoResponseDto {
    return {} as ItemsCarritoResponseDto;
  }
  
  @ApiOperation({
    summary: 'Eliminar item del carrito',
    description: 'Elimina un item existente en el carrito por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Item del carrito eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Delete(':usuarioId/:itemId')
  remove(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.itemsCarritoService.eliminarItem(usuarioId, itemId);
  }

  @ApiOperation({
    summary: 'Eliminar todos los items del carrito de un usuario',
    description: 'Elimina todos los items existentes en el carrito de un usuario por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Todos los items del carrito del usuario eliminados correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Delete(':usuarioId')
  removeAll(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
  ) {
    return this.itemsCarritoService.eliminarTodosLosItems(usuarioId);
  }


}
