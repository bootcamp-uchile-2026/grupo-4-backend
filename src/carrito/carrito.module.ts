import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Carrito } from './entities/carrito.entity';
import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, CartItem])],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}
