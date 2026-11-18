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

@Entity('metodos_pago')
export class MetodosPago {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  usuario_id!: number;

  @Column({ type: 'varchar', length: 80, nullable: false })
  proveedor_pago!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  token_referencia!: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  marca?: string | null;

  @Column({ type: 'char', length: 4, nullable: true })
  ultimos_cuatro?: string | null;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  vencimiento_mes?: number | null;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  vencimiento_anio?: number | null;

  @Column({ type: 'boolean', nullable: false, default: false })
  es_predeterminado!: boolean;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;
}
