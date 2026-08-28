import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Suscripcion } from './entities/suscripcion.entity';

@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) { }

  @ApiOperation({
    summary: 'Crear suscripción',
    description: 'Crea una nueva suscripción.',
  })
  @ApiResponse({
    status: 201,
    description: 'Suscripción creada correctamente.',
    type: Suscripcion,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la suscripción no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una suscripción con el nombre y/o productos indicados.',
  })
  @Post()
  create(@Body() createSuscripcionDto: CreateSuscripcionDto) {
    return this.suscripcionesService.create(createSuscripcionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener suscripciones',
    description: 'Obtiene una lista de suscripciones aplicando filtros opcionales.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de suscripciones obtenida correctamente.',
    type: Suscripcion,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @ApiQuery({
    name: 'activa',
    required: false,
    type: Boolean,
    example: true,
    description: 'Estado de suscripción, activa o deshabilitada',
  })
  findAll(@Query('activa', new DefaultValuePipe(true)) activa: Boolean) {
    return this.suscripcionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener suscripcion por id',
    description: 'Obtiene una suscripcion que tenga el id dado',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la suscripción',
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción obtenida correctamente.',
    type: Suscripcion,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  findOne(@Param('id') id: string) {
    return this.suscripcionesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modificar una suscripción',
    description: 'Modifica total o parcialmente una suscripción que tenga el id dado.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la suscripción',
  })
  @ApiResponse({
    status: 201,
    description: 'Suscripción modificada correctamente.',
    type: UpdateSuscripcionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la suscripción no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una suscripción con el nombre y/o productos indicados.',
  })
  update(@Param('id') id: string, @Body() updateSuscripcioneDto: UpdateSuscripcionDto) {
    return this.suscripcionesService.update(+id, updateSuscripcioneDto);
  }

  @ApiOperation({
    summary: 'Eliminar suscripción',
    description: 'Elimina una suscripción mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la suscripción',
  })
  @ApiResponse({
    status: 204,
    description: 'Suscripción eliminada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la suscripción no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Suscripción no encontrada.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscripcionesService.remove(+id);
  }
}
