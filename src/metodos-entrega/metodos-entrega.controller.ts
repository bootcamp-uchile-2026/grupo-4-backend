import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MetodoEntregaResponseDto } from './dto/response-metodos-entrega.dto';
import { MetodosEntregaService } from './metodos-entrega.service';
import { CreateMetodosEntregaDto } from './dto/create-metodos-entrega.dto';
import { CotizarEntregaDto } from './dto/cotizar-entrega.dto';
import { UpdateMetodosEntregaDto } from './dto/update-metodos-entrega.dto';
import { CotizacionEntregaResponseDto } from './dto/response-cotizar-entrega.dto';

@ApiTags('Métodos de entrega')
@Controller('metodos-entrega')
export class MetodosEntregaController {
  constructor(private readonly metodosEntregaService: MetodosEntregaService) {}

  @ApiOperation({ 
    summary: 'Obtener todos los métodos de entrega' 
  })
  @ApiOkResponse({ 
    description: 'Lista de métodos de entrega obtenida correctamente' 
  })
  @Get()
  findAll() {
    return this.metodosEntregaService.findAll();
  }

  @ApiOperation({ 
    summary: 'Cotizar métodos de entrega para los productos y la comuna indicados' 
  })
  @ApiOkResponse({
    type: CotizacionEntregaResponseDto,
    description: 'Métodos evaluados para los productos y la comuna indicados',
  })
  @Post('cotizar')
  cotizar(@Body() cotizarEntregaDto: CotizarEntregaDto) {
    return this.metodosEntregaService.cotizar(cotizarEntregaDto);
  }

  @ApiOperation({
    summary: 'Obtener un método de entrega por su ID' 
  })
  @ApiOkResponse({
    type: MetodoEntregaResponseDto,
    description: 'Método de entrega obtenido correctamente',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodosEntregaService.findOne(id);
  }

  @ApiOperation({
    summary: 'Crear un nuevo método de entrega'
  })
  @ApiOkResponse({
    type: MetodoEntregaResponseDto,
    description: 'Método de entrega creado correctamente',
  })
  @Post()
  create(@Body() createMetodosEntregaDto: CreateMetodosEntregaDto) {
    return this.metodosEntregaService.create(createMetodosEntregaDto);
  }

  @ApiOperation({
    summary: 'Actualizar un método de entrega por su ID'
  })
  @ApiOkResponse({
    type: MetodoEntregaResponseDto,
    description: 'Método de entrega actualizado correctamente',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMetodosEntregaDto: UpdateMetodosEntregaDto,
  ) {
    return this.metodosEntregaService.update(id, updateMetodosEntregaDto);
  }
  
  @ApiOperation({
    summary: 'Eliminar un método de entrega por su ID'
  })
  @ApiOkResponse({
    description: 'Método de entrega eliminado correctamente',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metodosEntregaService.remove(id);
  }
}
