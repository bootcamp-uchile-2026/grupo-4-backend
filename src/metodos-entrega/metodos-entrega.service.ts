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
}
