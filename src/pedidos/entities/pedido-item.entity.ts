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
import { Pedido } from './pedido.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('pedido_items')
export class PedidoItem {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  pedido_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  producto_id!: number;

  @Column({ type: 'varchar', length: 180, nullable: false })
  nombre_producto!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  precio_unitario!: string;

  @Column({ type: 'int', unsigned: true, nullable: false })
  cantidad!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  subtotal!: string;

  @ManyToOne(() => Pedido, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
  rel_pedido!: Pedido;

  @ManyToOne(() => Producto, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  rel_producto!: Producto;
}
