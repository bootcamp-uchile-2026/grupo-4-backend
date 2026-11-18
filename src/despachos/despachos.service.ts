import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateDespachoDto } from './dto/create-despacho.dto';
import { UpdateDespachoDto } from './dto/update-despacho.dto';
import { DespachoQueryDto } from './dto/despacho-query.dto';
import { Despacho } from './entities/despacho.entity';
import { EstadoDespacho } from './enums/estado-despacho.enum';
@Injectable()
export class DespachosService {
  constructor(
    @InjectRepository(Despacho) private readonly repo: Repository<Despacho>,
  ) {}
  private response(d: Despacho) {
    return {
      id: d.id,
      pedidoId: d.pedido_id,
      zonaId: d.zona_id ?? null,
      estado: d.estado as EstadoDespacho,
    };
  }
  async create(dto: CreateDespachoDto) {
    if (await this.repo.existsBy({ pedido_id: dto.pedidoId }))
      throw new ConflictException('El pedido ya tiene un despacho.');
    return this.response(
      await this.repo.save(
        this.repo.create({
          pedido_id: dto.pedidoId,
          zona_id: dto.zonaId ?? null,
          estado: EstadoDespacho.PENDIENTE,
        }),
      ),
    );
  }
  async findAll(q: DespachoQueryDto) {
    const where: any = {};
    if (q.pedidoId !== undefined) where.pedido_id = q.pedidoId;
    if (q.estado !== undefined) where.estado = q.estado;
    return (await this.repo.find({ where })).map((d) => this.response(d));
  }
  private async buscar(id: number) {
    const d = await this.repo.findOneBy({ id });
    if (!d) throw new NotFoundException('Despacho no encontrado.');
    return d;
  }
  async findOne(id: number) {
    return this.response(await this.buscar(id));
  }
  async update(id: number, dto: UpdateDespachoDto) {
    const d = await this.buscar(id);
    if (
      dto.pedidoId !== undefined &&
      (await this.repo.existsBy({ pedido_id: dto.pedidoId, id: Not(id) }))
    )
      throw new ConflictException('El pedido ya tiene un despacho.');
    if (dto.pedidoId !== undefined) d.pedido_id = dto.pedidoId;
    if (dto.zonaId !== undefined) d.zona_id = dto.zonaId;
    if (dto.estado !== undefined) d.estado = dto.estado;
    return this.response(await this.repo.save(d));
  }
  async remove(id: number) {
    await this.repo.remove(await this.buscar(id));
  }
}
