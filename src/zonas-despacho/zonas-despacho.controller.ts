import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateZonaDespachoDto } from './dto/create-zona-despacho.dto';
import { UpdateZonaDespachoDto } from './dto/update-zona-despacho.dto';
import { ZonaDespachoQueryDto } from './dto/zona-despacho-query.dto';
import { ZonaDespachoResponseDto } from './dto/zona-despacho-response.dto';
import { ZonasDespachoService } from './zonas-despacho.service';

@ApiTags('Zonas de despacho')
@Controller('zonas-despacho')
export class ZonasDespachoController {
  constructor(private readonly zonasDespachoService: ZonasDespachoService) {}

  @ApiOperation({
    summary: 'Crear zona de despacho',
    description: 'Crea una nueva zona de despacho. Queda activa al crearse.',
  })
  @ApiResponse({
    status: 201,
    description: 'Zona de despacho creada correctamente.',
    type: ZonaDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la zona de despacho no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una zona de despacho con ese nombre.',
  })
  @Post()
  create(
    @Body() createZonaDespachoDto: CreateZonaDespachoDto,
  ): ZonaDespachoResponseDto {
    return this.zonasDespachoService.create(createZonaDespachoDto);
  }

  @ApiOperation({
    summary: 'Obtener zonas de despacho',
    description:
      'Obtiene la lista de zonas de despacho. Se puede filtrar por estado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de zonas de despacho obtenida correctamente.',
    type: ZonaDespachoResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Get()
  findAll(@Query() query: ZonaDespachoQueryDto): ZonaDespachoResponseDto[] {
    return this.zonasDespachoService.findAll(query);
  }

  @ApiOperation({
    summary: 'Obtener zona de despacho por ID',
    description: 'Obtiene una zona de despacho mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la zona de despacho',
  })
  @ApiResponse({
    status: 200,
    description: 'Zona de despacho obtenida correctamente.',
    type: ZonaDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la zona de despacho no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Zona de despacho no encontrada.',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): ZonaDespachoResponseDto {
    return this.zonasDespachoService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar zona de despacho',
    description:
      'Actualiza parcialmente una zona de despacho. También permite activarla o deshabilitarla.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la zona de despacho',
  })
  @ApiResponse({
    status: 200,
    description: 'Zona de despacho actualizada correctamente.',
    type: ZonaDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos de la zona de despacho no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Zona de despacho no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una zona de despacho con ese nombre.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateZonaDespachoDto: UpdateZonaDespachoDto,
  ): ZonaDespachoResponseDto {
    return this.zonasDespachoService.update(id, updateZonaDespachoDto);
  }

  @ApiOperation({
    summary: 'Deshabilitar zona de despacho',
    description:
      'Deshabilita una zona de despacho. No se borra: queda con activa en false.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único de la zona de despacho',
  })
  @ApiResponse({
    status: 200,
    description: 'Zona de despacho deshabilitada correctamente.',
    type: ZonaDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la zona de despacho no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Zona de despacho no encontrada.',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): ZonaDespachoResponseDto {
    return this.zonasDespachoService.remove(id);
  }
}
