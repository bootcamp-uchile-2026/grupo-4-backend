import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { Suscripcion } from './entities/suscripcion.entity';
import { SuscripcionProducto } from './entities/suscripcion-producto.entity';
@Injectable()
export class SuscripcionesService {
  constructor(
    @InjectRepository(Suscripcion)
    private readonly repo: Repository<Suscripcion>,
    @InjectRepository(SuscripcionProducto)
    private readonly items: Repository<SuscripcionProducto>,
  ) {}
  private async response(s: Suscripcion) {
    const links = await this.items.findBy({ suscripcion_id: s.id });
    return {
      id: s.id,
      nombre: s.nombre,
      descripcion: s.descripcion ?? '',
      precio: Number(s.precio),
      activa: s.activa,
      productosId: links.map((x) => x.producto_id),
    };
  }
  async create(dto: CreateSuscripcionDto) {
    if (await this.repo.existsBy({ nombre: dto.nombre }))
      throw new ConflictException('Ya existe una suscripción con ese nombre.');
    const s = await this.repo.save(
      this.repo.create({
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: String(dto.precio),
        activa: true,
      }),
    );
    await this.items.save(
      dto.productosId.map((producto_id) =>
        this.items.create({ suscripcion_id: s.id, producto_id }),
      ),
    );
    return this.response(s);
  }
  async findAll(activa?: boolean) {
    const all = await this.repo.find({
      where: activa === undefined ? {} : { activa },
    });
    return Promise.all(all.map((s) => this.response(s)));
  }
  private async buscar(id: number) {
    const s = await this.repo.findOneBy({ id });
    if (!s) throw new NotFoundException('Suscripción no encontrada.');
    return s;
  }
  async findOne(id: number) {
    return this.response(await this.buscar(id));
  }
  async update(id: number, dto: UpdateSuscripcionDto) {
    const s = await this.buscar(id);
    if (dto.nombre !== undefined) {
      if (await this.repo.existsBy({ nombre: dto.nombre, id: Not(id) }))
        throw new ConflictException(
          'Ya existe una suscripción con ese nombre.',
        );
      s.nombre = dto.nombre;
    }
    if (dto.descripcion !== undefined) s.descripcion = dto.descripcion;
    if (dto.precio !== undefined) s.precio = String(dto.precio);
    if (dto.activa !== undefined) s.activa = dto.activa;
    await this.repo.save(s);
    if (dto.productosId !== undefined) {
      await this.items.delete({ suscripcion_id: id });
      await this.items.save(
        dto.productosId.map((producto_id) =>
          this.items.create({ suscripcion_id: id, producto_id }),
        ),
      );
    }
    return this.response(s);
  }
  async remove(id: number) {
    const s = await this.buscar(id);
    s.activa = false;
    return this.response(await this.repo.save(s));
  }
}
