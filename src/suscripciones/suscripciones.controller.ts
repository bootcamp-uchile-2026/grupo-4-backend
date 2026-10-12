import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuscripcionResponseDTO } from './dto/suscripcion-response.dto';

@ApiTags('Suscripciones')
@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear suscripción',
    description: 'Crea una nueva suscripción.',
  })
  @ApiResponse({
    status: 201,
    description: 'Suscripción creada correctamente.',
    type: SuscripcionResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la suscripción no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una suscripción con el nombre y/o productos indicados.',
  })
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
    isArray: true,
    description: 'Lista de suscripciones obtenida correctamente.',
    type: SuscripcionResponseDTO,
  })
  @ApiQuery({
    name: 'activa',
    required: false,
    type: Boolean,
    example: true,
    description: 'Estado de suscripción, activa o deshabilitada',
  })
  findAll(@Query('activa') activa: boolean) {
    return this.suscripcionesService.findAll(activa);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener suscripción por id',
    description: 'Obtiene una suscripción que tenga el id dado',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la suscripción',
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción obtenida correctamente.',
    type: SuscripcionResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'El id de la suscripción no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Suscripción no encontrada.',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.suscripcionesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modificar una suscripción',
    description: 'Modifica total o parcialmente una suscripción que tenga el id dado.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la suscripción',
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción modificada correctamente.',
    type: SuscripcionResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la suscripción no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Suscripción no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una suscripción con el nombre y/o productos indicados.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSuscripcionDto: UpdateSuscripcionDto) {
    return this.suscripcionesService.update(id, updateSuscripcionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deshabilitar suscripción',
    description: 'Deshabilita una suscripción mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la suscripción',
  })
  @ApiResponse({
    status: 200,
    description: 'Suscripción deshabilitada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El id de la suscripción no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Suscripción no encontrada.',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.suscripcionesService.remove(id);
  }
}
