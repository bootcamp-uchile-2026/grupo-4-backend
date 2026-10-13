import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  private stocks: Stock[] = [];

  constructor() {
    this.create({
      productoId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      cantidad: 50,
      stockMinimo: 10,
    });
    this.create({
      productoId: '550e8400-e29b-41d4-a716-446655440000',
      cantidad: 5,
      stockMinimo: 10,
    });
  }

  create(createStockDto: CreateStockDto) {
    const existe = this.stocks.find(
      (s) => s.productoId === createStockDto.productoId,
    );
    if (existe) {
      throw new ConflictException('El producto ya tiene un registro de stock.');
    }

    const stock = new Stock(
      randomUUID(),
      createStockDto.productoId,
      createStockDto.cantidad,
      createStockDto.stockMinimo,
    );
    this.stocks.push(stock);
    return stock;
  }

  findAll() {
    return this.stocks;
  }

  findOne(productoId: string) {
    const stock = this.stocks.find((s) => s.productoId === productoId);
    if (!stock) {
      throw new NotFoundException('No existe stock asociado al producto.');
    }
    return stock;
  }

  update(productoId: string, updateStockDto: UpdateStockDto) {
    const stock = this.findOne(productoId);

    if (updateStockDto.productoId && updateStockDto.productoId !== productoId) {
      const existe = this.stocks.find(
        (s) => s.productoId === updateStockDto.productoId,
      );
      if (existe) {
        throw new ConflictException(
          'El producto ya tiene un registro de stock.',
        );
      }
    }

    for (const campo in updateStockDto) {
      const valor = updateStockDto[campo];
      if (valor !== undefined && valor !== null) {
        stock[campo] = valor;
      }
    }

    return stock;
  }

  remove(productoId: string) {
    this.findOne(productoId);
    this.stocks = this.stocks.filter((s) => s.productoId !== productoId);
  }
}
