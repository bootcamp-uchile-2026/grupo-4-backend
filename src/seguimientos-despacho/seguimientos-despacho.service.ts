import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeguimientoDespachoDto } from './dto/create-seguimiento-despacho.dto';
import { UpdateSeguimientoDespachoDto } from './dto/update-seguimiento-despacho.dto';
import { SeguimientoDespachoQueryDto } from './dto/seguimiento-despacho-query.dto';
import { SeguimientoDespacho } from './entities/seguimiento-despacho.entity';
import { EstadoSeguimiento } from './enums/estado-seguimiento.enum';
@Injectable()
export class SeguimientosDespachoService {
  constructor(
    @InjectRepository(SeguimientoDespacho)
    private readonly repo: Repository<SeguimientoDespacho>,
  ) {}
  private response(s: SeguimientoDespacho) {
    return {
      id: s.id,
      despachoId: s.despacho_id,
      estado: s.estado as EstadoSeguimiento,
      descripcion: s.detalle ?? '',
      fecha: s.fecha,
    };
  }
  async create(dto: CreateSeguimientoDespachoDto) {
    return this.response(
      await this.repo.save(
        this.repo.create({
          despacho_id: dto.despachoId,
          estado: dto.estado,
          detalle: dto.descripcion,
        }),
      ),
    );
  }
  async findAll(q: SeguimientoDespachoQueryDto) {
    return (
      await this.repo.find({
        where: q.despachoId !== undefined ? { despacho_id: q.despachoId } : {},
      })
    ).map((s) => this.response(s));
  }
  private async buscar(id: number) {
    const s = await this.repo.findOneBy({ id });
    if (!s) throw new NotFoundException('Seguimiento no encontrado.');
    return s;
  }
  async findOne(id: number) {
    return this.response(await this.buscar(id));
  }
  async update(id: number, dto: UpdateSeguimientoDespachoDto) {
    const s = await this.buscar(id);
    if (dto.despachoId !== undefined) s.despacho_id = dto.despachoId;
    if (dto.estado !== undefined) s.estado = dto.estado;
    if (dto.descripcion !== undefined) s.detalle = dto.descripcion;
    return this.response(await this.repo.save(s));
  }
  async remove(id: number) {
    await this.repo.remove(await this.buscar(id));
  }
}
