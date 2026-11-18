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

@Entity('carritos')
export class Carrito {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false, unique: true })
  usuario_id!: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creado_en!: Date;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;
}
