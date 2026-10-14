import { Injectable } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { TarjetaResponseDto } from './dto/tarjeta-response.dto';

@Injectable()
export class TarjetasService {
  create(createTarjetaDto: CreateTarjetaDto): TarjetaResponseDto {
    return {
      id: 1,
      nombre: createTarjetaDto.nombre,
      ultimosDigitos: createTarjetaDto.numero.slice(-4),
      mensaje: 'Tarjeta procesada correctamente (simulación)',
    };
  }
}