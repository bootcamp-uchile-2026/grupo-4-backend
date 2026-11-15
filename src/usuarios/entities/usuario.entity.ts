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
import { Rol } from '../../roles/entities/rol.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido!: string;

  @Column({ type: 'varchar', length: 190, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  telefono?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_hash!: string;

  @Column({ type: 'int', unsigned: true, nullable: false })
  rol_id!: number;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, {
    nullable: false,
  })
  @JoinColumn({ name: 'rol_id' })
  rol!: Rol;

  @Column({ type: 'boolean', nullable: false, default: false })
  email_verificado!: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creado_en!: Date;
}
