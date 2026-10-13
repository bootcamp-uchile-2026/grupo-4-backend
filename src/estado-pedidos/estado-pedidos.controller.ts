import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { EstadoPedidosService } from './estado-pedidos.service';
import { UpdateEstadoPedidoDto } from './dto/update-estado-pedido.dto';
import { EstadoPedidoResponseDto } from './dto/response-estado-pedido.dto';

@ApiTags('Estado de pedidos')
@Controller('pedidos/:pedidoId/estado')
export class EstadoPedidosController {
  constructor(private readonly estadoPedidosService: EstadoPedidosService) {}

  @ApiOperation({ 
    summary: 'Obtener el historial de estados de un pedido' 
  })
  @Get()
  findAll(
    @Param('pedidoId', ParseIntPipe) pedidoId: number
  ) {
    return this.estadoPedidosService.findAll(pedidoId);
  }

  @ApiOperation({
    summary: 'Actualizar el estado de un pedido'
  })
  @ApiOkResponse({ 
    type: EstadoPedidoResponseDto, 
    description: 'Estado actualizado (solo admin)' 
  })
  @Patch()
  update(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Body() updateEstadoPedidoDto: UpdateEstadoPedidoDto
  ) {
    return this.estadoPedidosService.update(pedidoId, updateEstadoPedidoDto);
  }

  @ApiOperation({
    summary: 'Cancelar un pedido'
  })
  @ApiOkResponse({ 
    type: EstadoPedidoResponseDto, 
    description: 'Pedido cancelado' 
  })
  @Post('cancelar')
  cancelar(
    @Param('pedidoId', ParseIntPipe) pedidoId: number
  ) {
    return this.estadoPedidosService.cancelar(pedidoId);
  }

  
  @ApiOperation({
    summary: 'Obtener el historial de estados de un pedido'
  })
  @ApiOkResponse({ 
    type: EstadoPedidoResponseDto, 
    description: 'Historial de estados del pedido' 
  })
  @Get('historial')
  historial(
    @Param('pedidoId', ParseIntPipe) pedidoId: number
  ) {
    return this.estadoPedidosService.findAll(pedidoId);
  }
}
