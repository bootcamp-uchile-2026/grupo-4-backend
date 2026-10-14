
import { Injectable } from '@nestjs/common';
import { CreateDatosFacturacionDto } from './dto/create-datos-facturacion.dto';
import { DatosFacturacionResponseDto } from './dto/datos-facturacion-response.dto';

@Injectable()
export class DatosFacturacionService {
  create(
    dto: CreateDatosFacturacionDto,
  ): DatosFacturacionResponseDto {
    return {
      id: 1,
      nombreCompleto: dto.nombreCompleto,
      rut: dto.rut,
      direccion: dto.direccion,
    };
  }
}
