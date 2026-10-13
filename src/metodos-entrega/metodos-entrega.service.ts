import { CotizarEntregaDto } from './dto/cotizar-entrega.dto';
import { Injectable } from '@nestjs/common';
import { CreateMetodosEntregaDto } from './dto/create-metodos-entrega.dto';
import { UpdateMetodosEntregaDto } from './dto/update-metodos-entrega.dto';

@Injectable()
export class MetodosEntregaService {
  create(createMetodosEntregaDto: CreateMetodosEntregaDto) {
    return 'This action adds a new metodosEntrega';
  }

  findAll() {
    return `This action returns all metodosEntrega`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metodosEntrega`;
  }

  update(id: number, updateMetodosEntregaDto: UpdateMetodosEntregaDto) {
    return `This action updates a #${id} metodosEntrega`;
  }

  remove(id: number) {
    return `This action removes a #${id} metodosEntrega`;
  }
  cotizar(dto: CotizarEntregaDto) {
    return { subtotalProductos: 0, metodos: [{ id: 1, nombre: 'Entrega a domicilio (simulación)', tipo: 'DOMICILIO', costo: 4990, gratis: false, diasEstimadosMin: 2, diasEstimadosMax: 4, disponible: true, motivoNoDisponible: null }] };
  }
}
