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
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { ZonaDespacho } from '../../zonas-despacho/entities/zona-despacho.entity';

@Entity('despachos')
export class Despacho {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false, unique: true })
  pedido_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  zona_id?: number | null;

  @Column({ type: 'varchar', length: 40, nullable: false })
  estado!: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  codigo_seguimiento?: string | null;

  @ManyToOne(() => Pedido, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
  rel_pedido!: Pedido;

  @ManyToOne(() => ZonaDespacho, { nullable: true, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'zona_id', referencedColumnName: 'id' })
  rel_zona?: ZonaDespacho | null;
}
