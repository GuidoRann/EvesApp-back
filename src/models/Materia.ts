import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Maestra } from './Maestra';
import { Grado } from './Grado';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn('uuid')
  materiaId: string;

  @Column()
  nombre: string;

  @ManyToOne(() => Maestra)
  @JoinColumn({ name: 'maestra_id' })
  maestra: Maestra;

  @ManyToOne(() => Grado)
  @JoinColumn({ name: 'grado_id' })
  grado: Grado;
}