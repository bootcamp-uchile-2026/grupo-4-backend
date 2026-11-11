
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  categoria_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  proveedor_id!: number;

  @Column({ type: 'varchar', length: 180, nullable: false })
  nombre!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ type: 'text', nullable: true })
  ingredientes?: string | null;

  @Column({ type: 'text', nullable: true })
  valor_nutricional?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo_conservacion?: string | null;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento?: Date | null;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
  })
  precio!: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    default: 0,
  })
  descuento!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagen?: string | null;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: false,
    default: 0,
  })
  stock_cantidad!: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: false,
    default: 0,
  })
  stock_minimo!: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  favorito!: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  activo!: boolean;

  @ManyToOne(() => Categoria, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'categoria_id',
    referencedColumnName: 'id',
  })
  rel_categoria!: Categoria;

  @ManyToOne(() => Proveedor, {
    nullable: false,
    onDelete: 'NO ACTION',
  })
  @JoinColumn({
    name: 'proveedor_id',
    referencedColumnName: 'id',
  })
  rel_proveedor!: Proveedor;
}
