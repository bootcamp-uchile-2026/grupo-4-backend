import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import { Suscripcion } from './entities/suscripcion.entity';

@Injectable()
export class SuscripcionesService {

  private suscripciones: Suscripcion[] = [];

  constructor() {
    this.suscripciones.push(
      new Suscripcion(
        'Selección mensual de vinos tintos y blancos de viñas boutique.',
        'Caja Básica - Vinos',
        19990,
        [
          '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          '550e8400-e29b-41d4-a716-446655440000',
        ],
      ),
      new Suscripcion(
        'Quesos artesanales y charcutería para compartir en la sobremesa.',
        'Caja Premium - Quesos y Charcutería',
        34990,
        [
          '9b2d5c1a-3e4f-4a6b-8c7d-0e1f2a3b4c5d',
          '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
          '6f1e2d3c-4b5a-4c6d-9e8f-7a6b5c4d3e2f',
        ],
      ),
    );
  }

  create(createSuscripcionDto: CreateSuscripcionDto) {
    const existe = this.suscripciones.find(
      (s) => s.nombre === createSuscripcionDto.nombre,
    );
    if (existe) {
      throw new ConflictException('Ya existe una suscripción con ese nombre.');
    }

    const suscripcion = new Suscripcion(
      createSuscripcionDto.descripcion,
      createSuscripcionDto.nombre,
      createSuscripcionDto.precio,
      createSuscripcionDto.productosId,
    );
    this.suscripciones.push(suscripcion);
    return suscripcion;
  }

  findAll(activa: boolean) {
    if (activa === undefined) {
      return this.suscripciones;
    }
    return this.suscripciones.filter((s) => s.activa === activa)
  }

  findOne(id: string) {
    const suscripcion = this.suscripciones.find((s) => s.id === id);
    if (!suscripcion) {
      throw new NotFoundException('Suscripción no encontrada.');
    }
    return suscripcion;
  }

  update(id: string, updateSuscripcionDto: UpdateSuscripcionDto) {
    const suscripcion = this.findOne(id);

    if (updateSuscripcionDto.nombre) {
      const existe = this.suscripciones.find(
        (s) => s.nombre === updateSuscripcionDto.nombre && s.id !== id,
      );
      if (existe) {
        throw new ConflictException('Ya existe una suscripción con ese nombre.');
      }
    }

    for (const campo in updateSuscripcionDto) {
      const valor = updateSuscripcionDto[campo];
      if (valor !== undefined && valor !== null) {
        suscripcion[campo] = valor;
      }
    }

    return suscripcion;
  }

  remove(id: string) {
    const suscripcion = this.findOne(id);
    suscripcion.activa = false;
    return suscripcion;
  }
}
