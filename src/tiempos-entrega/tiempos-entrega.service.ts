import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTiempoEntregaDto } from './dto/create-tiempo-entrega.dto';
import { TiempoEntregaQueryDto } from './dto/tiempo-entrega-query.dto';
import { UpdateTiempoEntregaDto } from './dto/update-tiempo-entrega.dto';
import { TiempoEntrega } from './entities/tiempo-entrega.entity';

@Injectable()
export class TiemposEntregaService {
  private tiempos: TiempoEntrega[] = [];

  constructor() {
    this.create({
      zonaId: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
      diasMinimo: 1,
      diasMaximo: 3,
    });
    this.create({
      zonaId: '6f1e2d3c-4b5a-4c6d-9e8f-7a6b5c4d3e2f',
      diasMinimo: 3,
      diasMaximo: 7,
    });
  }

  create(createTiempoEntregaDto: CreateTiempoEntregaDto) {
    if (createTiempoEntregaDto.diasMaximo < createTiempoEntregaDto.diasMinimo) {
      throw new BadRequestException(
        'diasMaximo no puede ser menor que diasMinimo.',
      );
    }

    const existe = this.tiempos.find(
      (t) => t.zonaId === createTiempoEntregaDto.zonaId,
    );
    if (existe) {
      throw new ConflictException('La zona ya tiene un tiempo de entrega.');
    }

    const tiempo = new TiempoEntrega(
      randomUUID(),
      createTiempoEntregaDto.zonaId,
      createTiempoEntregaDto.diasMinimo,
      createTiempoEntregaDto.diasMaximo,
    );
    this.tiempos.push(tiempo);
    return tiempo;
  }

  findAll(query: TiempoEntregaQueryDto) {
    if (query.zonaId) {
      return this.tiempos.filter((t) => t.zonaId === query.zonaId);
    }
    return this.tiempos;
  }

  findOne(id: string) {
    const tiempo = this.tiempos.find((t) => t.id === id);
    if (!tiempo) {
      throw new NotFoundException('Tiempo de entrega no encontrado.');
    }
    return tiempo;
  }

  update(id: string, updateTiempoEntregaDto: UpdateTiempoEntregaDto) {
    const tiempo = this.findOne(id);

    if (updateTiempoEntregaDto.zonaId) {
      const existe = this.tiempos.find(
        (t) => t.zonaId === updateTiempoEntregaDto.zonaId && t.id !== id,
      );
      if (existe) {
        throw new ConflictException('La zona ya tiene un tiempo de entrega.');
      }
    }

    // se revisa cómo quedarían los días después del cambio (0 es un valor válido)
    const diasMinimo = updateTiempoEntregaDto.diasMinimo ?? tiempo.diasMinimo;
    const diasMaximo = updateTiempoEntregaDto.diasMaximo ?? tiempo.diasMaximo;
    if (diasMaximo < diasMinimo) {
      throw new BadRequestException(
        'diasMaximo no puede ser menor que diasMinimo.',
      );
    }

    for (const campo in updateTiempoEntregaDto) {
      const valor = updateTiempoEntregaDto[campo];
      if (valor !== undefined && valor !== null) {
        tiempo[campo] = valor;
      }
    }

    return tiempo;
  }

  remove(id: string) {
    this.findOne(id);
    this.tiempos = this.tiempos.filter((t) => t.id !== id);
  }
}
