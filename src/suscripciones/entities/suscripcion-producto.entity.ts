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
import { Suscripcion } from './suscripcion.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('suscripcion_productos')
export class SuscripcionProducto {
  @PrimaryColumn({ type: 'int', unsigned: true })
  suscripcion_id!: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  producto_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false, default: 1 })
  cantidad!: number;

  @ManyToOne(() => Suscripcion, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'suscripcion_id', referencedColumnName: 'id' })
  rel_suscripcion!: Suscripcion;

  @ManyToOne(() => Producto, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  rel_producto!: Producto;
}
