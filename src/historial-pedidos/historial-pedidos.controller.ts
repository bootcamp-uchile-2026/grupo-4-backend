import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { HistorialPedidosService } from './historial-pedidos.service';
import { CreateHistorialPedidoDto } from './dto/create-historial-pedido.dto';
import { UpdateHistorialPedidoDto } from './dto/update-historial-pedido.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Historial de pedidos')
@Controller('historial-pedidos')
export class HistorialPedidosController {
  constructor(private readonly historialPedidosService: HistorialPedidosService) {}

  @ApiOperation({
    summary: 'Obtener el historial de pedidos'
  })
  @Get()
  findAll(
    @Query() query: HistorialPedidosQueryDto,
  ) {
    return this.service.listarMisPedidos(usuarioId, query);
  }

  @ApiOperation({
    summary: 'Obtener un pedido específico del historial'
  })
  @ApiOkResponse({
    description: 'Pedido de un usuario'
  })
  @Get(':id')
  findOne(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Query() query: HistorialPedidosQueryDto,
    @Param('id') id: string
  ) {
    return this.historialPedidosService.findOne(+id);
  }

  @ApiOperation({
    description: 'Obtener el detalle de un pedido específico del historial'
  })
  @Get(':pedidoId')
  findDetalle(
    @Param('pedidoId', ParseIntPipe) pedidoId: number
  ) {
    return this.historialPedidosService.findDetalle(+pedidoId);
  }
}
