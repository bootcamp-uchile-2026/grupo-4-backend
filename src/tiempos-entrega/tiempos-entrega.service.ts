import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateTiempoEntregaDto } from './dto/create-tiempo-entrega.dto';
import { UpdateTiempoEntregaDto } from './dto/update-tiempo-entrega.dto';
import { TiempoEntregaQueryDto } from './dto/tiempo-entrega-query.dto';
@Injectable()
export class TiemposEntregaService {
  private unsupported(): never {
    throw new NotImplementedException(
      'El modelo SQL Database First no define tiempos de entrega por zona.',
    );
  }
  create(_dto: CreateTiempoEntregaDto): never {
    return this.unsupported();
  }
  findAll(_query: TiempoEntregaQueryDto): never {
    return this.unsupported();
  }
  findOne(_id: string): never {
    return this.unsupported();
  }
  update(_id: string, _dto: UpdateTiempoEntregaDto): never {
    return this.unsupported();
  }
  remove(_id: string): never {
    return this.unsupported();
  }
}
