import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoResponseDto } from './dto/producto-response.dto';
import { ProductoQueryDto } from './dto/producto-query.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @ApiOperation({
    summary: 'Obtener productos',
    description: 'Obtiene una lista de productos aplicando filtros opcionales.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente.',
    type: ProductoResponseDto,
    isArray: true,
  })
  @Get()
  findAll(
    @Query() query: ProductoQueryDto,
  ): ProductoResponseDto[] {
    return [];
  }

  
  @ApiOperation({
    summary: 'Obtener productos más vendidos',
    description: 'Obtiene los productos con mayor cantidad de ventas.',
  })
  @ApiQuery({
    name: 'limite',
    required: false,
    type: Number,
    example: 5,
    description: 'Cantidad máxima de productos a retornar',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos más vendidos obtenida correctamente.',
    type: ProductoResponseDto,
    isArray: true,
  })
  @Get('top-ventas')
  findTopVentas(
    @Query('limite', new DefaultValuePipe(5), ParseIntPipe)
    limite: number,
  ): ProductoResponseDto[] {
    return [];
  }

  
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description: 'Obtiene un producto específico mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido correctamente.',
    type: ProductoResponseDto,
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): ProductoResponseDto {
    return {} as ProductoResponseDto;
  }
}
