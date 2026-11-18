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

@Entity('historial_estados_pedido')
export class HistorialEstadoPedido {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  pedido_id!: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  estado!: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha!: Date;

  @ManyToOne(() => Pedido, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
  rel_pedido!: Pedido;
}
