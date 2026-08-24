import { Injectable } from '@nestjs/common';
import { CreateDireccioneDto } from './dto/create-direccion.dto';
import { UpdateDireccioneDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionesService {
  create(createDireccioneDto: CreateDireccioneDto) {
    return 'This action adds a new direccione';
  }

  findAll() {
    return `This action returns all direcciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} direccione`;
  }

  update(id: number, updateDireccioneDto: UpdateDireccioneDto) {
    return `This action updates a #${id} direccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} direccione`;
  }
}
