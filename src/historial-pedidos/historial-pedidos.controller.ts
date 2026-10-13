import { HistorialPedidosQueryDto } from './dto/query-historial-pedido.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { HistorialPedidosService } from './historial-pedidos.service';
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
    return this.historialPedidosService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener un pedido específico del historial'
  })
  @ApiOkResponse({
    description: 'Pedido de un usuario'
  })
  @Get(':id')
  findOne(
        @Query() query: HistorialPedidosQueryDto,
    @Param('id') id: string
  ) {
    return this.historialPedidosService.findOne(+id);
  }

  @ApiOperation({
    description: 'Obtener el detalle de un pedido específico del historial'
  })
  @Get(':pedidoId/detalle')
  findDetalle(
    @Param('pedidoId', ParseIntPipe) pedidoId: number
  ) {
    return this.historialPedidosService.findDetalle(+pedidoId);
  }
}
