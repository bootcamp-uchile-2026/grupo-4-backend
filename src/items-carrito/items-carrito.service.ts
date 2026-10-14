import { Injectable } from '@nestjs/common';
import { CreateItemsCarritoDto } from './dto/create-items-carrito.dto';
import { UpdateItemsCarritoDto } from './dto/update-items-carrito.dto';

@Injectable()
export class ItemsCarritoService {
  create(createItemsCarritoDto: CreateItemsCarritoDto) {
    return 'This action adds a new itemsCarrito';
  }

  findAll() {
    return `This action returns all itemsCarrito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemsCarrito`;
  }

  update(id: number, updateItemsCarritoDto: UpdateItemsCarritoDto) {
    return `This action updates a #${id} itemsCarrito`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemsCarrito`;
  }
  eliminarItem(usuarioId: number, itemId: number) {
    return { usuarioId, itemId, mensaje: 'Eliminación simulada; no se modificaron datos' };
  }

  eliminarTodosLosItems(usuarioId: number) {
    return { usuarioId, itemsEliminados: 0, mensaje: 'Vaciado simulado; no se modificaron datos' };
  }
}
