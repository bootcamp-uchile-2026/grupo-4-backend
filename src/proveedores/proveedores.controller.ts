import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProveedorResponseDto } from './dto/proveedor-response.dto';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @ApiOperation({
    summary: 'Obtener proveedores',
    description: 'Obtiene una lista de proveedores.',
  })

  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores obtenida correctamente.',
    type: ProveedorResponseDto,
    isArray: true,
  })

  @Get()
  findAll(): ProveedorResponseDto[] {
    return [];
  }


  @ApiOperation({
    summary: 'Obtener proveedor por ID',
    description: 'Obtiene un proveedor específico mediante su identificador.',
  })

  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del proveedor',
  })

  @ApiResponse({
    status: 200,
    description: 'Proveedor obtenido correctamente.',
    type: ProveedorResponseDto,
  })

  @ApiResponse({
    status: 400,
    description: 'El ID del proveedor no es válido.',
  })

  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado.',
  })

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): ProveedorResponseDto {
    return {} as ProveedorResponseDto;
  }


  @ApiOperation({
    summary: 'Crear proveedor',
    description: 'Crea un nuevo proveedor.',
  })

  @ApiResponse({
    status: 201,
    description: 'Proveedor creado correctamente.',
    type: ProveedorResponseDto,
  })

  @ApiResponse({
    status: 400,
    description: 'Los datos del proveedor no son válidos.',
  })

  @ApiResponse({
    status: 409,
    description: 'Ya existe un proveedor con los datos proporcionados.',
  })

  @Post()
  create(
    @Body() createProveedorDto: CreateProveedorDto,
  ): ProveedorResponseDto {
    return {} as ProveedorResponseDto;
  }

}
