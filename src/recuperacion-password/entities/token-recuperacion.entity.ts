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

@Entity('tokens_recuperacion')
export class TokenRecuperacion {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int', unsigned: true, nullable: false })
  usuario_id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  token_hash!: string;

  @Column({ type: 'datetime', nullable: false })
  expira_en!: Date;

  @Column({ type: 'datetime', nullable: true })
  usado_en?: Date | null;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;
}
