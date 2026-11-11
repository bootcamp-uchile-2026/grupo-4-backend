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
import { Suscripcion } from './suscripcion.entity';

@Entity('suscripciones_usuarios')
export class SuscripcionUsuario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  usuario_id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  suscripcion_id!: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_inicio!: Date;

  @Column({ type: 'varchar', length: 30, nullable: false, default: 'ACTIVA' })
  estado!: string;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;

  @ManyToOne(() => Suscripcion, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'suscripcion_id', referencedColumnName: 'id' })
  rel_suscripcion!: Suscripcion;
}
