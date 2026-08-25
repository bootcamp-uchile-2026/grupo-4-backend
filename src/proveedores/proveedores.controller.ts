import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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


}
