import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PedidoResponseDto } from './dto/pedido-response.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado-pedido.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @ApiOperation({
    summary: 'Obtener pedidos',
    description: 'Obtiene una lista de pedidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos obtenida correctamente.',
    type: PedidoResponseDto,
    isArray: true,
  })
  @Get()
  findAll(): PedidoResponseDto[] {
    return [];
  }

  @ApiOperation({
    summary: 'Obtener pedido por ID',
    description: 'Obtiene un pedido específico mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido obtenido correctamente.',
    type: PedidoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del pedido no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): PedidoResponseDto {
    return {} as PedidoResponseDto;
  }

  @ApiOperation({
    summary: 'Crear pedido',
    description: 'Crea un nuevo pedido a partir de los productos seleccionados.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado correctamente.',
    type: PedidoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del pedido no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'El usuario o alguno de los productos no existe.',
  })
  @Post()
  create(
    @Body() createPedidoDto: CreatePedidoDto,
  ): PedidoResponseDto {
    return {} as PedidoResponseDto;
  }

  @ApiOperation({
    summary: 'Actualizar estado del pedido',
    description: 'Actualiza el estado de un pedido existente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del pedido actualizado correctamente.',
    type: PedidoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o el estado proporcionado no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado.',
  })
  @Patch(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoPedidoDto: UpdateEstadoPedidoDto,
  ): PedidoResponseDto {
    return {} as PedidoResponseDto;
  }

}
