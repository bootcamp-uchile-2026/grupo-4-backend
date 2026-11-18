import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Producto)
    private readonly productos: Repository<Producto>,
  ) {}
  private response(p: Producto) {
    return {
      id: p.id,
      productoId: p.id,
      cantidad: p.stock_cantidad,
      stockMinimo: p.stock_minimo,
    };
  }
  private async buscar(productoId: number): Promise<Producto> {
    const p = await this.productos.findOneBy({ id: productoId });
    if (!p) throw new NotFoundException('Producto no encontrado.');
    return p;
  }
  async findOne(productoId: number) {
    return this.response(await this.buscar(productoId));
  }
  async create(dto: CreateStockDto) {
    // El stock es parte de productos; no se crea una segunda fila ni una tabla stock.
    const p = await this.buscar(dto.productoId);
    p.stock_cantidad = dto.cantidad;
    p.stock_minimo = dto.stockMinimo;
    return this.response(await this.productos.save(p));
  }
  async update(productoId: number, dto: UpdateStockDto) {
    if (dto.productoId !== undefined && dto.productoId !== productoId)
      throw new BadRequestException(
        'No se puede reasignar el stock a otro producto.',
      );
    const p = await this.buscar(productoId);
    if (dto.cantidad !== undefined) p.stock_cantidad = dto.cantidad;
    if (dto.stockMinimo !== undefined) p.stock_minimo = dto.stockMinimo;
    return this.response(await this.productos.save(p));
  }
  async remove(productoId: number): Promise<void> {
    // No hay tabla stock: eliminar su registro equivale a poner ambas cantidades en cero.
    const p = await this.buscar(productoId);
    p.stock_cantidad = 0;
    p.stock_minimo = 0;
    await this.productos.save(p);
  }
}
