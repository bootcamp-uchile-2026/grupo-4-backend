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

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  usuario_id!: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  nombre_receptor?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  telefono?: string | null;

  @Column({ type: 'varchar', length: 180, nullable: false })
  calle!: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  numero!: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  comuna!: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  ciudad!: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  region!: string;

  @Column({ type: 'text', nullable: true })
  instrucciones?: string | null;

  @Column({ type: 'boolean', nullable: false, default: false })
  es_predeterminada!: boolean;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;
}
