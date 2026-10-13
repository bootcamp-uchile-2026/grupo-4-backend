import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodosPagoDto } from './dto/create-metodos-pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos-pago.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { MetodoPagoResponseDto } from './dto/response-metodos-pago.dto';

@ApiTags('Métodos de pago')
@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @ApiOperation({ 
  summary: 'Obtener todos los métodos de pago' 
})
  @ApiOkResponse({ 
    type: [MetodoPagoResponseDto], 
    description: 'Mis métodos de pago' })
  @Get()
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @ApiOperation({ 
    summary: 'Obtener un método de pago predeterminado' 
  })
  @ApiOkResponse({ 
    type: MetodoPagoResponseDto, 
    description: 'Método de pago predeterminado' 
  })
  @Get('predeterminado')
  findPredeterminado() {
    return this.metodosPagoService.findPredeterminado();
  }

  @ApiOperation({ 
    summary: 'Obtener un método de pago por su ID' 
  })
  @ApiOkResponse({ 
    type: MetodoPagoResponseDto, 
    description: 'Método de pago encontrado' 
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metodosPagoService.findOne(+id);
  }

  @ApiOperation({ 
    summary: 'Crear un nuevo método de pago' 
  })
  @ApiOkResponse({ 
    type: MetodoPagoResponseDto, 
    description: 'Método de pago creado' 
  })
  @Post()
  create(@Body() createMetodosPagoDto: CreateMetodosPagoDto) {
    return this.metodosPagoService.create(createMetodosPagoDto);
  }

  @ApiOperation({ 
    summary: 'Actualizar un método de pago por su ID' 
  })
  @ApiOkResponse({ 
    type: MetodoPagoResponseDto, 
    description: 'Método de pago actualizado' 
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetodosPagoDto: UpdateMetodosPagoDto) {
    return this.metodosPagoService.update(+id, updateMetodosPagoDto);
  }

  @ApiOperation({ 
    summary: 'Actualizar un método de pago predeterminado' 
  })
  @ApiOkResponse({ 
    type: MetodoPagoResponseDto, 
    description: 'Método de pago predeterminado actualizado' 
  })
  @Patch('predeterminado')
  updatePredeterminado(@Body() updateMetodosPagoDto: UpdateMetodosPagoDto) {
    return this.metodosPagoService.updatePredeterminado(updateMetodosPagoDto);
  }

  @ApiOperation({ 
    summary: 'Eliminar un método de pago por su ID' 
  })
  @ApiOkResponse({ 
    type: MetodoPagoResponseDto, 
    description: 'Método de pago eliminado' 
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metodosPagoService.remove(+id);
  }
}
