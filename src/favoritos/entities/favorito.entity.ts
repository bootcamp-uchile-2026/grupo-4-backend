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
import { Producto } from '../../productos/entities/producto.entity';

@Entity('favoritos')
export class Favorito {
  @PrimaryColumn({ type: 'int', unsigned: true })
  usuario_id!: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  producto_id!: number;

  @ManyToOne(() => Usuario, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  rel_usuario!: Usuario;

  @ManyToOne(() => Producto, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  rel_producto!: Producto;
}
