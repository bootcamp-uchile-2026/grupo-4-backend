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

@Entity('datos_facturacion')
export class DatosFacturacion {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false, unique: true })
  pedido_id!: number;

  @Column({ type: 'varchar', length: 180, nullable: true })
  razon_social?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rut?: string | null;

  @Column({ type: 'varchar', length: 180, nullable: true })
  giro?: string | null;

  @Column({ type: 'text', nullable: true })
  direccion?: string | null;

  @ManyToOne(() => Pedido, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
  rel_pedido!: Pedido;
}
