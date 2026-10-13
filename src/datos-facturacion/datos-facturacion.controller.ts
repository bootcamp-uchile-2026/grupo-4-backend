
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DatosFacturacionService } from './datos-facturacion.service';
import { CreateDatosFacturacionDto } from './dto/create-datos-facturacion.dto';
import { DatosFacturacionResponseDto } from './dto/datos-facturacion-response.dto';

@ApiTags('Datos de facturación')
@Controller('datos-facturacion')
export class DatosFacturacionController {
  constructor(
    private readonly datosFacturacionService: DatosFacturacionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Ingresar datos de facturación',
    description:
      'Recibe y devuelve los datos de facturación en una simulación, sin persistirlos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Datos de facturación recibidos correctamente.',
    type: DatosFacturacionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos enviados no son válidos.',
  })
  create(
    @Body() dto: CreateDatosFacturacionDto,
  ): DatosFacturacionResponseDto {
    return this.datosFacturacionService.create(dto);
  }
}
