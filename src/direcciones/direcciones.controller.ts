import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DireccionResponseDto } from './dto/direccion-response.dto';

@ApiTags('Direcciones')
@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @ApiOperation({
  summary: 'Obtener direcciones',
  description: 'Obtiene una lista de direcciones.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de direcciones obtenida correctamente.',
    type: DireccionResponseDto,
    isArray: true,
  })
  @Get()
  findAll(): DireccionResponseDto[] {
    return [];
  }
  


  @ApiOperation({
    summary: 'Obtener dirección por ID',
    description: 'Obtiene una dirección específica mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único de la dirección',
  })
  @ApiResponse({
    status: 200,
    description: 'Dirección obtenida correctamente.',
    type: DireccionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID de la dirección no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): DireccionResponseDto {
    return {} as DireccionResponseDto;
  }



}
