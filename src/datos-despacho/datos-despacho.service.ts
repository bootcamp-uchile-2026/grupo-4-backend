import { Injectable } from '@nestjs/common';
import { CreateDatosDespachoDto } from './dto/create-datos-despacho.dto';
import { UpdateDatosDespachoDto } from './dto/update-datos-despacho.dto';

@Injectable()
export class DatosDespachoService {
  create(createDatosDespachoDto: CreateDatosDespachoDto) {
    return 'This action adds a new datosDespacho';
  }

  findAll() {
    return `This action returns all datosDespacho`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosDespacho`;
  }

  update(id: number, updateDatosDespachoDto: UpdateDatosDespachoDto) {
    return `This action updates a #${id} datosDespacho`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosDespacho`;
  }
}
