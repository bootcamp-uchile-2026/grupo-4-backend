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
import { MetodosPago } from '../../metodos-pago/entities/metodos-pago.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  pedido_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  metodo_pago_id?: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  monto!: string;

  @Column({ type: 'varchar', length: 40, nullable: false })
  estado!: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  referencia_externa?: string | null;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creado_en!: Date;

  @ManyToOne(() => Pedido, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
  rel_pedido!: Pedido;

  @ManyToOne(() => MetodosPago, { nullable: true, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'metodo_pago_id', referencedColumnName: 'id' })
  rel_metodo_pago?: MetodosPago | null;
}
