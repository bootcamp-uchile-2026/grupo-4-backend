import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe } from '@nestjs/common';
import { ResenasService } from './resenas.service';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Resena } from './entities/resena.entity';

@Controller('resenas')
export class ResenasController {
  constructor(private readonly resenasService: ResenasService) { }

  @ApiOperation({
    summary: 'Crear reseña',
    description: 'Crea un nueva reseña.',
  })
  @ApiResponse({
    status: 201,
    description: 'Reseña creada correctamente.',
    type: Resena,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la reseña no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una reseña con los datos proporcionados.',
  })
  @Post()
  create(@Body() createResenaDto: CreateResenaDto) {
    return this.resenasService.create(createResenaDto);
  }


  @ApiOperation({
    summary: 'Obtener reseñas',
    description: 'Obtiene una lista de reseñas, con filtros opcionales.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reseñas obtenida correctamente.',
    type: Resena,
    isArray: true,
  })
  @ApiQuery({
    name: 'productoId',
    required: false,
    type: Number,
    example: true,
    description: 'Id del producto al cual se reseña',
  })
  @ApiQuery({
    name: 'clienteId',
    required: false,
    type: Number,
    example: true,
    description: 'Id del cliente que hace la reseña',
  })
  @Get()
  findAll(
    @Query('productoId') productoId: number,
    @Query('clienteId') clienteId: number,) {
    return this.resenasService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener reseña por ID',
    description: 'Obtiene una reseña específica mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la reseña',
  })
  @ApiResponse({
    status: 200,
    description: 'Reseña obtenido correctamente.',
    type: Resena,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la reseña no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reseña no encontrado.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resenasService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Modificar reseña',
    description: 'Actualiza parcial o completamente datos de una reseña existente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la reseña',
  })
  @ApiResponse({
    status: 200,
    description: 'Reseña modificada correctamente.',
    type: Resena,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos de la reseña no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reseña no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una reseña con los datos proporcionados.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResenaDto: UpdateResenaDto) {
    return this.resenasService.update(+id, updateResenaDto);
  }

  @ApiOperation({
    summary: 'Eliminar reseña',
    description: 'Elimina una reseña mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la reseña.',
  })
  @ApiResponse({
    status: 204,
    description: 'Reseña eliminada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la reseña no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reseña no encontrada.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resenasService.remove(+id);
  }
}
