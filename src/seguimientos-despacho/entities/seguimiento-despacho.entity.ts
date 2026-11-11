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
import { Despacho } from '../../despachos/entities/despacho.entity';

@Entity('seguimientos_despacho')
export class SeguimientoDespacho {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  despacho_id!: number;

  @Column({ type: 'varchar', length: 40, nullable: false })
  estado!: string;

  @Column({ type: 'text', nullable: true })
  detalle?: string | null;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha!: Date;

  @ManyToOne(() => Despacho, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'despacho_id', referencedColumnName: 'id' })
  rel_despacho!: Despacho;
}
