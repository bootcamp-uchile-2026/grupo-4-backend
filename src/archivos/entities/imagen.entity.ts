import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';

@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  producto_id!: number | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  proveedor_id!: number | null;

  @Column({ type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ type: 'varchar', length: 500 })
  ruta!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  mime_type!: string | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  tamano!: string | null;

  @Column({ type: 'boolean', default: false })
  es_principal!: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creado_en!: Date;

  @ManyToOne(() => Producto, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producto_id' })
  rel_producto?: Producto | null;

  @ManyToOne(() => Proveedor, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proveedor_id' })
  rel_proveedor?: Proveedor | null;
}
