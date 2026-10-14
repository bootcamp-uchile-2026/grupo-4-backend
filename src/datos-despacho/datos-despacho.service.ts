import { Injectable } from '@nestjs/common';
import { CreateDatoDespachoDto } from './dto/create-datos-despacho.dto';
import { UpdateDatosDespachoDto } from './dto/update-datos-despacho.dto';

@Injectable()
export class DatosDespachoService {
  create(createDatosDespachoDto: CreateDatoDespachoDto) {
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
  findPredeterminada() {
    return { id: 1, alias: 'Casa de prueba', nombreReceptor: 'Usuario de prueba', telefono: '+56911111111', instrucciones: null, esPredeterminado: true };
  }

  updatePredeterminada(dto: UpdateDatosDespachoDto) {
    return { id: 1, alias: dto.alias ?? 'Casa de prueba', nombreReceptor: dto.nombreReceptor ?? 'Usuario de prueba', telefono: dto.telefono ?? '+56911111111', instrucciones: dto.instrucciones ?? null, esPredeterminado: true };
  }
}
