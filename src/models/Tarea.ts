import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Maestra } from './Maestra';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn('uuid')
  tareaId: string

  @Column()
  descripcion: string

  @ManyToOne(() => Maestra, maestra => maestra.tareas)
  maestra: Maestra

  @Column()
  expiracion: Date

  @Column()
  completada: boolean
}