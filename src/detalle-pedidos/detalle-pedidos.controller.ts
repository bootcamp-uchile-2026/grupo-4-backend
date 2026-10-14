import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreatePedidoItemDto } from 'src/pedidos/dto/create-pedido-item.dto';


@ApiTags('Detalle de pedidos')
@Controller('pedidos/:pedidoId/items')
export class DetallePedidosController {
  constructor(private readonly detallePedidosService: DetallePedidosService) {}

  @ApiOperation({
    summary: 'Ítems de un pedido',
    description: 'Obtiene la lista de ítems asociados a un pedido específico.',
  })
  @Get()
  findAll(@Param('pedidoId', ParseIntPipe) pedidoId: number) {
    return this.detallePedidosService.findAll();
  }

  @ApiOperation({
    summary: 'Crear un ítem en un pedido',
    description: 'Agrega un nuevo ítem a un pedido específico.',
  })
  @Post()
  create(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Body() dto: CreatePedidoItemDto,
  ) {
    return this.detallePedidosService.create(/*pedidoId,*/ dto);
  }

  @ApiOperation({
    summary: 'Actualizar un ítem de un pedido',
    description: 'Actualiza los detalles de un ítem específico en un pedido.',
  })
  @Patch(':itemId')
  update(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: CreatePedidoItemDto,
  ) {
    return this.detallePedidosService.update(/*pedidoId,*/ itemId, dto);
  }

  @ApiOperation({
    summary: 'Eliminar un ítem de un pedido',
    description: 'Elimina un ítem específico de un pedido.',
  })
  @Delete(':itemId')
  remove(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.detallePedidosService.remove(/*pedidoId,*/ itemId);
  }
}
