
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavoritosService } from './favoritos.service';
import { FavoritoResponseDto } from './dto/favorito-response.dto';

@ApiTags('Favoritos')
@Controller('favoritos')
export class FavoritosController {
  constructor(
    private readonly favoritosService: FavoritosService,
  ) {}

  @ApiOperation({
    summary: 'Obtener productos favoritos',
    description: 'Obtiene la lista de productos favoritos del usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos obtenida correctamente.',
    type: FavoritoResponseDto,
    isArray: true,
  })
  @Get()
  findAll(): FavoritoResponseDto[] {
    return this.favoritosService.findAll();
  }

  @ApiOperation({
    summary: 'Agregar producto a favoritos',
    description: 'Agrega un producto a la lista de favoritos del usuario.',
  })
  @ApiParam({
    name: 'productoId',
    type: Number,
    example: 1,
    description: 'Identificador único del producto.',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto agregado a favoritos correctamente.',
    type: FavoritoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @Post(':productoId')
  add(
    @Param('productoId', ParseIntPipe) productoId: number,
  ): FavoritoResponseDto {
    return this.favoritosService.add(productoId);
  }

  @ApiOperation({
    summary: 'Eliminar producto de favoritos',
    description: 'Elimina un producto de la lista de favoritos del usuario.',
  })
  @ApiParam({
    name: 'productoId',
    type: Number,
    example: 1,
    description: 'Identificador único del producto.',
  })
  @ApiResponse({
    status: 204,
    description: 'Producto eliminado de favoritos correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del producto no es válido.',
  })
  @Delete(':productoId')
  @HttpCode(204)
  remove(
    @Param('productoId', ParseIntPipe) productoId: number,
  ): void {
    return this.favoritosService.remove(productoId);
  }
}
