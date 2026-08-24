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


  

}
