import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateSeguimientoDespachoDto } from './dto/create-seguimiento-despacho.dto';
import { SeguimientoDespachoQueryDto } from './dto/seguimiento-despacho-query.dto';
import { UpdateSeguimientoDespachoDto } from './dto/update-seguimiento-despacho.dto';
import { SeguimientoDespacho } from './entities/seguimiento-despacho.entity';
import { EstadoSeguimiento } from './enums/estado-seguimiento.enum';

@Injectable()
export class SeguimientosDespachoService {
  private seguimientos: SeguimientoDespacho[] = [];

  constructor() {
    this.create({
      despachoId: 'a3bb189e-8bf9-4888-9912-ace4e6543002',
      estado: EstadoSeguimiento.EN_PREPARACION,
      descripcion: 'El pedido se está preparando en la bodega.',
    });
    this.create({
      despachoId: 'a3bb189e-8bf9-4888-9912-ace4e6543002',
      estado: EstadoSeguimiento.DESPACHADO,
      descripcion: 'El pedido salió de la bodega.',
    });
  }

  create(createSeguimientoDespachoDto: CreateSeguimientoDespachoDto) {
    const seguimiento = new SeguimientoDespacho(
      randomUUID(),
      createSeguimientoDespachoDto.despachoId,
      createSeguimientoDespachoDto.estado,
      createSeguimientoDespachoDto.descripcion,
      new Date(),
    );
    this.seguimientos.push(seguimiento);
    return seguimiento;
  }

  findAll(query: SeguimientoDespachoQueryDto) {
    if (query.despachoId) {
      return this.seguimientos.filter((s) => s.despachoId === query.despachoId);
    }
    return this.seguimientos;
  }

  findOne(id: string) {
    const seguimiento = this.seguimientos.find((s) => s.id === id);
    if (!seguimiento) {
      throw new NotFoundException('Seguimiento no encontrado.');
    }
    return seguimiento;
  }

  update(
    id: string,
    updateSeguimientoDespachoDto: UpdateSeguimientoDespachoDto,
  ) {
    const seguimiento = this.findOne(id);

    for (const campo in updateSeguimientoDespachoDto) {
      const valor = updateSeguimientoDespachoDto[campo];
      if (valor !== undefined && valor !== null) {
        seguimiento[campo] = valor;
      }
    }

    return seguimiento;
  }

  remove(id: string) {
    this.findOne(id);
    this.seguimientos = this.seguimientos.filter((s) => s.id !== id);
  }
}
