import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { TarjetaResponseDto } from './dto/tarjeta-response.dto';

@ApiTags('Tarjetas')
@Controller('tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post()
  @ApiOperation({
    summary: 'Simular el procesamiento de una tarjeta',
  })
  @ApiResponse({
    status: 201,
    description: 'Tarjeta procesada en modo simulación',
    type: TarjetaResponseDto,
  })
  create(
    @Body() createTarjetaDto: CreateTarjetaDto,
  ): TarjetaResponseDto {
    return this.tarjetasService.create(createTarjetaDto);
  }
}