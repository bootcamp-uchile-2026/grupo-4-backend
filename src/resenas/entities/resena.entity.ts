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
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Unique(['usuario_id', 'producto_id'])
@Entity('resenas')
export class Resena {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  usuario_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  producto_id!: number;

  @Column({ type: 'varchar', length: 180, nullable: false })
  titulo!: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  estrellas!: number;

  @Column({ type: 'text', nullable: true })
  detalle?: string | null;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;

  @ManyToOne(() => Producto, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  rel_producto!: Producto;
}
