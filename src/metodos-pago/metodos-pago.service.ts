import { Injectable } from '@nestjs/common';
import { CreateMetodoPagoDto } from './dto/create-metodos-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodos-pago.dto';

@Injectable()
export class MetodosPagoService {
  create(createMetodosPagoDto: CreateMetodoPagoDto) {
    return 'This action adds a new metodosPago';
  }

  findAll() {
    return `This action returns all metodosPago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metodosPago`;
  }

  update(id: number, updateMetodosPagoDto: UpdateMetodoPagoDto) {
    return `This action updates a #${id} metodosPago`;
  }

  remove(id: number) {
    return `This action removes a #${id} metodosPago`;
  }
  findPredeterminado() {
    return { id: 1, alias: 'Tarjeta de prueba', marca: 'VISA', ultimosCuatro: '4242', mesExpiracion: 12, anioExpiracion: 2029, titular: 'USUARIO DEMO', esPredeterminado: true, vencida: false };
  }

  updatePredeterminado(dto: UpdateMetodoPagoDto) {
    return { id: 1, alias: dto.alias ?? 'Tarjeta de prueba', marca: 'VISA', ultimosCuatro: '4242', mesExpiracion: 12, anioExpiracion: 2029, titular: 'USUARIO DEMO', esPredeterminado: true, vencida: false };
  }
}
