import {
  Controller,
  HttpCode,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaResponseDto } from './dto/categoria-response.dto';

import { AuthGuard } from '../autenticacion/guards/auth.guard';
import { RolesGuard } from '../autenticacion/guards/roles.guard';
import { Roles } from '../autenticacion/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/enums/rol-usuario.enum';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @ApiOperation({
    summary: 'Obtener categorías',
    description:
      'Obtiene una lista de categorías, opcionalmente filtradas por nombre.',
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
  findAll(@Query('nombre') nombre?: string): Promise<CategoriaResponseDto[]> {
    return this.categoriasService.findAll(nombre);
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
  ): Promise<CategoriaResponseDto[]> {
    return this.categoriasService.findTop(limite);
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
  ): Promise<CategoriaResponseDto> {
    return this.categoriasService.findOne(id);
  }

  @ApiOperation({
    summary: 'Crear categoría',
    description: 'Solo los administradores pueden crear categorías.',
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
    status: 401,
    description: 'Token no proporcionado o inválido.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para crear categorías.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoría con el nombre indicado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @Post()
  create(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @ApiOperation({
    summary: 'Actualizar categoría',
    description:
      'Solo los administradores pueden actualizar categorías existentes.',
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
    status: 401,
    description: 'Token no proporcionado o inválido.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para actualizar categorías.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe una categoría con el nombre indicado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @ApiOperation({
    summary: 'Eliminar categoría',
    description:
      'Solo los administradores pueden eliminar categorías. No se pueden eliminar categorías asociadas a productos.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la categoría',
  })
  @ApiResponse({
    status: 204,
    description: 'Categoría eliminada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la categoría no es válido.',
  })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido.',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permisos para eliminar categorías.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'No se puede eliminar una categoría asociada a productos.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriasService.remove(id);
  }
}
