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
import { CreateTiempoEntregaDto } from './dto/create-tiempo-entrega.dto';
import { TiempoEntregaQueryDto } from './dto/tiempo-entrega-query.dto';
import { TiempoEntregaResponseDto } from './dto/tiempo-entrega-response.dto';
import { UpdateTiempoEntregaDto } from './dto/update-tiempo-entrega.dto';
import { TiemposEntregaService } from './tiempos-entrega.service';

@ApiTags('Tiempos de entrega')
@Controller('tiempos-entrega')
export class TiemposEntregaController {
  constructor(private readonly tiemposEntregaService: TiemposEntregaService) {}

  @ApiOperation({
    summary: 'Crear tiempo de entrega',
    description:
      'Define cuántos días demora la entrega en una zona de despacho.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tiempo de entrega creado correctamente.',
    type: TiempoEntregaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Los datos no son válidos o diasMaximo es menor que diasMinimo.',
  })
  @ApiResponse({
    status: 409,
    description: 'La zona ya tiene un tiempo de entrega.',
  })
  @Post()
  create(
    @Body() createTiempoEntregaDto: CreateTiempoEntregaDto,
  ): TiempoEntregaResponseDto {
    return this.tiemposEntregaService.create(createTiempoEntregaDto);
  }

  @ApiOperation({
    summary: 'Obtener tiempos de entrega',
    description:
      'Obtiene la lista de tiempos de entrega. Se puede filtrar por zona de despacho.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tiempos de entrega obtenida correctamente.',
    type: TiempoEntregaResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Get()
  findAll(@Query() query: TiempoEntregaQueryDto): TiempoEntregaResponseDto[] {
    return this.tiemposEntregaService.findAll(query);
  }

  @ApiOperation({
    summary: 'Obtener tiempo de entrega por ID',
    description: 'Obtiene un tiempo de entrega mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del tiempo de entrega',
  })
  @ApiResponse({
    status: 200,
    description: 'Tiempo de entrega obtenido correctamente.',
    type: TiempoEntregaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del tiempo de entrega no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tiempo de entrega no encontrado.',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): TiempoEntregaResponseDto {
    return this.tiemposEntregaService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar tiempo de entrega',
    description: 'Actualiza parcialmente un tiempo de entrega.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del tiempo de entrega',
  })
  @ApiResponse({
    status: 200,
    description: 'Tiempo de entrega actualizado correctamente.',
    type: TiempoEntregaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'El ID o los datos no son válidos, o diasMaximo queda menor que diasMinimo.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tiempo de entrega no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'La zona ya tiene un tiempo de entrega.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTiempoEntregaDto: UpdateTiempoEntregaDto,
  ): TiempoEntregaResponseDto {
    return this.tiemposEntregaService.update(id, updateTiempoEntregaDto);
  }

  @ApiOperation({
    summary: 'Eliminar tiempo de entrega',
    description: 'Elimina un tiempo de entrega mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del tiempo de entrega',
  })
  @ApiResponse({
    status: 204,
    description: 'Tiempo de entrega eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del tiempo de entrega no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tiempo de entrega no encontrado.',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.tiemposEntregaService.remove(id);
  }
}
