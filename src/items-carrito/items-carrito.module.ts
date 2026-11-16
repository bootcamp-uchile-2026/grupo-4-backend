import { Module } from '@nestjs/common';
import { ItemsCarritoService } from './items-carrito.service';
import { ItemsCarritoController } from './items-carrito.controller';

@Module({
  controllers: [],
  providers: [ItemsCarritoService],
})
export class ItemsCarritoModule {}
