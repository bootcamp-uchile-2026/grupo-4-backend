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
import { Direccion } from '../../direcciones/entities/direccion.entity';
import { MetodosEntrega } from '../../metodos-entrega/entities/metodos-entrega.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  usuario_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  direccion_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  metodo_entrega_id?: number | null;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    nullable: false,
    default: 'PENDING',
  })
  estado!: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    default: 0,
  })
  total!: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creado_en!: Date;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;

  @ManyToOne(() => Direccion, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'direccion_id', referencedColumnName: 'id' })
  rel_direccion!: Direccion;

  @ManyToOne(() => MetodosEntrega, { nullable: true, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'metodo_entrega_id', referencedColumnName: 'id' })
  rel_metodo_entrega?: MetodosEntrega | null;
}
