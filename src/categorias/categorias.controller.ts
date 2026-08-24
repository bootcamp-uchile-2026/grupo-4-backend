import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriaResponseDto } from './dto/categoria-response.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @ApiOperation({
    summary: 'Obtener categorías',
    description: 'Obtiene una lista de categorías, opcionalmente filtradas por nombre.',
  })
  @ApiQuery({
    name: 'nombre',
    required: false,
    type: String,
    example: 'Mermelada',
    description: 'Busca categorías cuyo nombre contenga el texto indicado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida correctamente.',
    type: CategoriaResponseDto,
    isArray: true,
  })
  @Get()
  findAll(
    @Query('nombre') nombre?: string,
  ): CategoriaResponseDto[] {
    return [];
  }


  @ApiOperation({
    summary: 'Obtener categorías más utilizadas',
    description: 'Obtiene las categorías con mayor cantidad de productos.',
  })
  @ApiQuery({
    name: 'limite',
    required: false,
    type: Number,
    example: 5,
    description: 'Cantidad máxima de categorías a retornar',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías más utilizadas obtenida correctamente.',
    type: CategoriaResponseDto,
    isArray: true,
  })
  @Get('top')
  findTop(
    @Query('limite', new DefaultValuePipe(5), ParseIntPipe)
    limite: number,
  ): CategoriaResponseDto[] {
    return [];
  }
  

  @ApiOperation({
    summary: 'Obtener categoría por ID',
    description: 'Obtiene una categoría específica mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la categoría',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría obtenida correctamente.',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la categoría no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): CategoriaResponseDto {
    return {} as CategoriaResponseDto;
  }


  @ApiOperation({
    summary: 'Crear categoría',
    description: 'Crea una nueva categoría.',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada correctamente.',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos de la categoría no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoría con el nombre indicado.',
  })
  @Post()
  create(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): CategoriaResponseDto {
    return {} as CategoriaResponseDto;
  }

  @ApiOperation({
    summary: 'Actualizar categoría',
    description: 'Actualiza parcialmente los datos de una categoría existente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la categoría',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada correctamente.',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos de la categoría no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoría con el nombre indicado.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): CategoriaResponseDto {
    return {} as CategoriaResponseDto;
  }

  
}
