import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateZonaDespachoDto } from './dto/create-zona-despacho.dto';
import { UpdateZonaDespachoDto } from './dto/update-zona-despacho.dto';
import { ZonaDespachoQueryDto } from './dto/zona-despacho-query.dto';
import { ZonaDespacho } from './entities/zona-despacho.entity';
@Injectable()
export class ZonasDespachoService {
  constructor(
    @InjectRepository(ZonaDespacho)
    private readonly repo: Repository<ZonaDespacho>,
  ) {}
  async create(dto: CreateZonaDespachoDto) {
    if (await this.repo.existsBy({ nombre: dto.nombre }))
      throw new ConflictException(
        'Ya existe una zona de despacho con ese nombre.',
      );
    return this.repo.save(this.repo.create({ nombre: dto.nombre }));
  }
  async findAll(_q: ZonaDespachoQueryDto) {
    return this.repo.find();
  }
  private async buscar(id: number) {
    const z = await this.repo.findOneBy({ id });
    if (!z) throw new NotFoundException('Zona de despacho no encontrada.');
    return z;
  }
  async findOne(id: number) {
    return this.buscar(id);
  }
  async update(id: number, dto: UpdateZonaDespachoDto) {
    const z = await this.buscar(id);
    if (dto.nombre !== undefined) {
      if (await this.repo.existsBy({ nombre: dto.nombre, id: Not(id) }))
        throw new ConflictException(
          'Ya existe una zona de despacho con ese nombre.',
        );
      z.nombre = dto.nombre;
    }
    return this.repo.save(z);
  }
  async remove(id: number) {
    const z = await this.buscar(id);
    await this.repo.remove(z);
    return z;
  }
}
