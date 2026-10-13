import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateDespachoDto } from './dto/create-despacho.dto';
import { DespachoQueryDto } from './dto/despacho-query.dto';
import { UpdateDespachoDto } from './dto/update-despacho.dto';
import { Despacho } from './entities/despacho.entity';
import { EstadoDespacho } from './enums/estado-despacho.enum';

@Injectable()
export class DespachosService {
  private despachos: Despacho[] = [];

  constructor() {
    this.create({
      pedidoId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      direccionId: '9b2d5c1a-3e4f-4a6b-8c7d-0e1f2a3b4c5d',
      zonaId: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    });
    const enCamino = this.create({
      pedidoId: '550e8400-e29b-41d4-a716-446655440000',
      direccionId: '6f1e2d3c-4b5a-4c6d-9e8f-7a6b5c4d3e2f',
      zonaId: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
    });
    enCamino.estado = EstadoDespacho.EN_CAMINO;
  }

  create(createDespachoDto: CreateDespachoDto) {
    const existe = this.despachos.find(
      (d) => d.pedidoId === createDespachoDto.pedidoId,
    );
    if (existe) {
      throw new ConflictException('El pedido ya tiene un despacho.');
    }

    const despacho = new Despacho(
      randomUUID(),
      createDespachoDto.pedidoId,
      createDespachoDto.direccionId,
      createDespachoDto.zonaId,
      EstadoDespacho.PENDIENTE,
    );
    this.despachos.push(despacho);
    return despacho;
  }

  findAll(query: DespachoQueryDto) {
    let resultado = this.despachos;
    if (query.pedidoId) {
      resultado = resultado.filter((d) => d.pedidoId === query.pedidoId);
    }
    if (query.estado) {
      resultado = resultado.filter((d) => d.estado === query.estado);
    }
    return resultado;
  }

  findOne(id: string) {
    const despacho = this.despachos.find((d) => d.id === id);
    if (!despacho) {
      throw new NotFoundException('Despacho no encontrado.');
    }
    return despacho;
  }

  update(id: string, updateDespachoDto: UpdateDespachoDto) {
    const despacho = this.findOne(id);

    if (updateDespachoDto.pedidoId) {
      const existe = this.despachos.find(
        (d) => d.pedidoId === updateDespachoDto.pedidoId && d.id !== id,
      );
      if (existe) {
        throw new ConflictException('El pedido ya tiene un despacho.');
      }
    }

    for (const campo in updateDespachoDto) {
      const valor = updateDespachoDto[campo];
      if (valor !== undefined && valor !== null) {
        despacho[campo] = valor;
      }
    }

    return despacho;
  }

  remove(id: string) {
    this.findOne(id);
    this.despachos = this.despachos.filter((d) => d.id !== id);
  }
}
