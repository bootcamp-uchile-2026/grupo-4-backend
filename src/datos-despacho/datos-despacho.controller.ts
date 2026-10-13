import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { DatosDespachoService } from './datos-despacho.service';
import { CreateDatosDespachoDto } from './dto/create-datos-despacho.dto';
import { UpdateDatosDespachoDto } from './dto/update-datos-despacho.dto';
import { DatoDespachoResponseDto } from './dto/response-datos-despacho.dto';

@ApiTags('Datos de despacho')
@Controller('datos-despacho')
export class DatosDespachoController {
  constructor(private readonly datosDespachoService: DatosDespachoService) {}

  @ApiOperation({ 
    summary: 'Generar dirección de despacho' 
  })
  @ApiOkResponse({ 
    type: [DatoDespachoResponseDto], 
    description: 'Mis direcciones de despacho' })
  @Get()
  findAll() {
    return this.datosDespachoService.findAll();
  }

  @ApiOperation({ 
    summary: 'Dirección de despacho predeterminada' 
  })
  @ApiOkResponse({ 
    type: DatoDespachoResponseDto, 
    description: 'Dirección de despacho predeterminada' 
  })
  @Get('predeterminada')
  findPredeterminada() {
    return this.datosDespachoService.findPredeterminada();
  }

  @ApiOperation({ 
    summary: 'Dirección de despacho por ID' 
  })
  @ApiOkResponse({ 
    type: DatoDespachoResponseDto, 
    description: 'Dirección de despacho por ID' 
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosDespachoService.findOne(id);
  }

  @ApiOperation({ 
    summary: 'Crear nueva dirección de despacho' 
  })
  @ApiOkResponse({ 
    type: DatoDespachoResponseDto, 
    description: 'Nueva dirección de despacho creada' 
  })
  @Post()
  create(@Body() createDatosDespachoDto: CreateDatosDespachoDto) {
    return this.datosDespachoService.create(createDatosDespachoDto);
  }

  @ApiOperation({ 
    summary: 'Actualizar dirección de despacho por ID' 
  })
  @ApiOkResponse({ 
    type: DatoDespachoResponseDto, 
    description: 'Dirección de despacho actualizada' 
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosDespachoDto: UpdateDatosDespachoDto) {
    return this.datosDespachoService.update(id, updateDatosDespachoDto);
  }

  @ApiOperation({ 
    summary: 'Actualizar dirección de despacho predeterminada' 
  })
  @ApiOkResponse({ 
    type: DatoDespachoResponseDto, 
    description: 'Dirección de despacho predeterminada actualizada' 
  })
  @Patch('predeterminada')
  updatePredeterminada(@Body() updateDatosDespachoDto: UpdateDatosDespachoDto) {
    return this.datosDespachoService.updatePredeterminada(updateDatosDespachoDto);
  }

  @ApiOperation({ 
    summary: 'Eliminar dirección de despacho por ID' 
  })
  @ApiOkResponse({ 
    type: DatoDespachoResponseDto, 
    description: 'Dirección de despacho eliminada' 
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosDespachoService.remove(id);
  }
}
