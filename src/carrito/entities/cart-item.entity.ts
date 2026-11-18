import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from 'typeorm';
import { Carrito } from './carrito.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Unique(['carrito_id', ' producto_id'])
@Entity('carrito_items')
export class CartItem {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  carrito_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  producto_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  cantidad!: number;

  @ManyToOne(() => Carrito, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carrito_id', referencedColumnName: 'id' })
  rel_carrito!: Carrito;

  @ManyToOne(() => Producto, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  rel_producto!: Producto;
}
