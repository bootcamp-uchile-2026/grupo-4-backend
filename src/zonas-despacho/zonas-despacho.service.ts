import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateZonaDespachoDto } from './dto/create-zona-despacho.dto';
import { UpdateZonaDespachoDto } from './dto/update-zona-despacho.dto';
import { ZonaDespachoQueryDto } from './dto/zona-despacho-query.dto';
import { ZonaDespacho } from './entities/zona-despacho.entity';

@Injectable()
export class ZonasDespachoService {
  private zonas: ZonaDespacho[] = [];

  constructor() {
    this.create({
      nombre: 'Santiago Centro',
      comunas: ['Santiago', 'Providencia', 'Ñuñoa'],
      costoEnvio: 3990,
    });
    this.create({
      nombre: 'Valparaíso',
      comunas: ['Valparaíso', 'Viña del Mar'],
      costoEnvio: 5990,
    });
  }

  create(createZonaDespachoDto: CreateZonaDespachoDto) {
    const existe = this.zonas.find(
      (z) => z.nombre === createZonaDespachoDto.nombre,
    );
    if (existe) {
      throw new ConflictException(
        'Ya existe una zona de despacho con ese nombre.',
      );
    }

    const zona = new ZonaDespacho(
      randomUUID(),
      createZonaDespachoDto.nombre,
      createZonaDespachoDto.comunas,
      createZonaDespachoDto.costoEnvio,
      true,
    );
    this.zonas.push(zona);
    return zona;
  }

  findAll(query: ZonaDespachoQueryDto) {
    if (query.activa === undefined) {
      return this.zonas;
    }
    return this.zonas.filter((z) => z.activa === query.activa);
  }

  findOne(id: string) {
    const zona = this.zonas.find((z) => z.id === id);
    if (!zona) {
      throw new NotFoundException('Zona de despacho no encontrada.');
    }
    return zona;
  }

  update(id: string, updateZonaDespachoDto: UpdateZonaDespachoDto) {
    const zona = this.findOne(id);

    if (updateZonaDespachoDto.nombre) {
      const existe = this.zonas.find(
        (z) => z.nombre === updateZonaDespachoDto.nombre && z.id !== id,
      );
      if (existe) {
        throw new ConflictException(
          'Ya existe una zona de despacho con ese nombre.',
        );
      }
    }

    for (const campo in updateZonaDespachoDto) {
      const valor = updateZonaDespachoDto[campo];
      if (valor !== undefined && valor !== null) {
        zona[campo] = valor;
      }
    }

    return zona;
  }

  remove(id: string) {
    const zona = this.findOne(id);
    zona.activa = false;
    return zona;
  }
}
