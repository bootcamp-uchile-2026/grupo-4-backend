import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DespachosService } from './despachos.service';
import { CreateDespachoDto } from './dto/create-despacho.dto';
import { DespachoQueryDto } from './dto/despacho-query.dto';
import { DespachoResponseDto } from './dto/despacho-response.dto';
import { UpdateDespachoDto } from './dto/update-despacho.dto';

@ApiTags('Despachos')
@Controller('despachos')
export class DespachosController {
  constructor(private readonly despachosService: DespachosService) {}

  @ApiOperation({
    summary: 'Crear despacho',
    description:
      'Crea el despacho de un pedido. Queda en estado PENDIENTE al crearse.',
  })
  @ApiResponse({
    status: 201,
    description: 'Despacho creado correctamente.',
    type: DespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del despacho no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'El pedido ya tiene un despacho.',
  })
  @Post()
  create(@Body() createDespachoDto: CreateDespachoDto): DespachoResponseDto {
    return this.despachosService.create(createDespachoDto);
  }

  @ApiOperation({
    summary: 'Obtener despachos',
    description:
      'Obtiene la lista de despachos. Se puede filtrar por pedido y por estado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de despachos obtenida correctamente.',
    type: DespachoResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Get()
  findAll(@Query() query: DespachoQueryDto): DespachoResponseDto[] {
    return this.despachosService.findAll(query);
  }

  @ApiOperation({
    summary: 'Obtener despacho por ID',
    description: 'Obtiene un despacho mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del despacho',
  })
  @ApiResponse({
    status: 200,
    description: 'Despacho obtenido correctamente.',
    type: DespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del despacho no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Despacho no encontrado.',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): DespachoResponseDto {
    return this.despachosService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar despacho',
    description:
      'Actualiza parcialmente un despacho. También permite cambiar su estado.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del despacho',
  })
  @ApiResponse({
    status: 200,
    description: 'Despacho actualizado correctamente.',
    type: DespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos del despacho no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Despacho no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'El pedido ya tiene un despacho.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDespachoDto: UpdateDespachoDto,
  ): DespachoResponseDto {
    return this.despachosService.update(id, updateDespachoDto);
  }

  @ApiOperation({
    summary: 'Eliminar despacho',
    description: 'Elimina un despacho mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del despacho',
  })
  @ApiResponse({
    status: 204,
    description: 'Despacho eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del despacho no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Despacho no encontrado.',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.despachosService.remove(id);
  }
}
