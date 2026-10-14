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
import { CreateSeguimientoDespachoDto } from './dto/create-seguimiento-despacho.dto';
import { SeguimientoDespachoQueryDto } from './dto/seguimiento-despacho-query.dto';
import { SeguimientoDespachoResponseDto } from './dto/seguimiento-despacho-response.dto';
import { UpdateSeguimientoDespachoDto } from './dto/update-seguimiento-despacho.dto';
import { SeguimientosDespachoService } from './seguimientos-despacho.service';

@ApiTags('Seguimiento de despacho')
@Controller('seguimientos-despacho')
export class SeguimientosDespachoController {
  constructor(
    private readonly seguimientosDespachoService: SeguimientosDespachoService,
  ) {}

  @ApiOperation({
    summary: 'Registrar avance de un despacho',
    description:
      'Agrega un avance al seguimiento de un despacho. La fecha la pone el servidor.',
  })
  @ApiResponse({
    status: 201,
    description: 'Seguimiento registrado correctamente.',
    type: SeguimientoDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del seguimiento no son válidos.',
  })
  @Post()
  create(
    @Body() createSeguimientoDespachoDto: CreateSeguimientoDespachoDto,
  ): SeguimientoDespachoResponseDto {
    return this.seguimientosDespachoService.create(
      createSeguimientoDespachoDto,
    );
  }

  @ApiOperation({
    summary: 'Obtener seguimientos',
    description:
      'Obtiene los avances registrados, del más antiguo al más nuevo. Se puede filtrar por despacho.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de seguimientos obtenida correctamente.',
    type: SeguimientoDespachoResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Los parámetros de búsqueda no son válidos.',
  })
  @Get()
  findAll(
    @Query() query: SeguimientoDespachoQueryDto,
  ): SeguimientoDespachoResponseDto[] {
    return this.seguimientosDespachoService.findAll(query);
  }

  @ApiOperation({
    summary: 'Obtener seguimiento por ID',
    description: 'Obtiene un avance del seguimiento mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del seguimiento',
  })
  @ApiResponse({
    status: 200,
    description: 'Seguimiento obtenido correctamente.',
    type: SeguimientoDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del seguimiento no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Seguimiento no encontrado.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): SeguimientoDespachoResponseDto {
    return this.seguimientosDespachoService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar seguimiento',
    description:
      'Corrige parcialmente un avance del seguimiento. La fecha no se modifica.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del seguimiento',
  })
  @ApiResponse({
    status: 200,
    description: 'Seguimiento actualizado correctamente.',
    type: SeguimientoDespachoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos del seguimiento no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Seguimiento no encontrado.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSeguimientoDespachoDto: UpdateSeguimientoDespachoDto,
  ): SeguimientoDespachoResponseDto {
    return this.seguimientosDespachoService.update(
      id,
      updateSeguimientoDespachoDto,
    );
  }

  @ApiOperation({
    summary: 'Eliminar seguimiento',
    description: 'Elimina un avance del seguimiento mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '3f2b8c1e-9a4d-4e7b-8c5f-1d2e3a4b5c6d',
    description: 'Identificador único del seguimiento',
  })
  @ApiResponse({
    status: 204,
    description: 'Seguimiento eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del seguimiento no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Seguimiento no encontrado.',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.seguimientosDespachoService.remove(id);
  }
}
