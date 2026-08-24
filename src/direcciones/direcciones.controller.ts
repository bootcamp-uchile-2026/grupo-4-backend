import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  
}
