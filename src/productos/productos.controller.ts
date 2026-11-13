import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../autenticacion/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoResponseDto } from './dto/producto-response.dto';
import { ProductoQueryDto } from './dto/producto-query.dto';

import { AuthGuard } from '../autenticacion/guards/auth.guard';
import { RolesGuard } from '../autenticacion/guards/roles.guard';
import { Roles } from '../autenticacion/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/enums/rol-usuario.enum';

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
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Get()
  findAll(@Query() query: ProductoQueryDto): Promise<ProductoResponseDto[]> {
    return this.productosService.findAll(query);
  }

  @ApiOperation({
    summary: 'Obtener productos más vendidos',
    description: 'Obtiene los productos con mayor cantidad de ventas.',
  })
  @ApiQuery({
    name: 'limite',
    required: false,
    type: Number,
    example: 10,
    description: 'Cantidad máxima de productos a retornar, debe ser mayor a 0',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos más vendidos obtenida correctamente.',
    type: ProductoResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'El límite indicado no es válido.',
  })
  @Get('top-ventas')
  findTopVentas(
    @Query('limite', new DefaultValuePipe(5), ParseIntPipe)
    limite: number,
  ): Promise<ProductoResponseDto[]> {
    return this.productosService.findTopVentas(limite);
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
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductoResponseDto> {
    return this.productosService.findOne(id);
  }

  @ApiOperation({
    summary: 'Crear producto',
    description:
      'ADMIN puede crear cualquier producto. PROVEEDOR crea productos asociados a su cuenta.',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
    type: ProductoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del producto no son válidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para crear productos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un producto con los datos proporcionados.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @Post()
  create(
    @Body() createProductoDto: CreateProductoDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<ProductoResponseDto> {
    return this.productosService.create(createProductoDto, request.user!);
  }

  @ApiOperation({
    summary: 'Actualizar producto',
    description:
      'ADMIN puede actualizar cualquier producto. PROVEEDOR solo puede actualizar sus propios productos.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
    type: ProductoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos del producto no son válidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para actualizar este producto.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<ProductoResponseDto> {
    return this.productosService.update(id, updateProductoDto, request.user!);
  }

  @ApiOperation({
    summary: 'Eliminar producto',
    description:
      'ADMIN puede desactivar cualquier producto. PROVEEDOR solo puede desactivar sus propios productos.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del producto',
  })
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para eliminar este producto.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    return this.productosService.remove(id, request.user!);
  }
}