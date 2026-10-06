import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ResenasService } from './resenas.service';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ResenaResponseDto } from './dto/resena-response.dto';
import { ResenaQueryDto } from './dto/resena-query.dto';

@Controller('resenas')
export class ResenasController {
  constructor(private readonly resenasService: ResenasService) { }

  @ApiOperation({
    summary: 'Crear reseña',
    description: 'Crea una nueva reseña.',
  })
  @ApiResponse({
    status: 201,
    description: 'Reseña creada correctamente.',
    type: ResenaResponseDto,
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
    type: ResenaResponseDto,
    isArray: true,
  })
  @Get()
  findAll( @Query() query: ResenaQueryDto ) {
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
    description: 'Reseña obtenida correctamente.',
    type: ResenaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la reseña no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reseña no encontrada.',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe ) id: number) {
    return this.resenasService.findOne(id);
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
    type: ResenaResponseDto,
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
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateResenaDto: UpdateResenaDto
  ) {
    return this.resenasService.update(id, updateResenaDto);
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resenasService.remove(id);
  }
}
