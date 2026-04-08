import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Escuela } from './Escuela';
import { Grado } from './Grado';
import { Tarea } from './Tarea';

@Entity()
export class Maestra {

  @PrimaryGeneratedColumn('uuid')
  maestraId: string;

  @Column({ unique: true })
  supabaseUserId: string;

  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  email: string;

  @ManyToMany(() => Escuela, escuela => escuela.maestras)
  @JoinTable()
  escuelas: Escuela[];

  // Grados donde es maestra titular ( incluye diferentes escuelas )
  @OneToMany( () => Grado, grado => grado.maestraTitular )
  gradosComoTitular: Grado[];
  
  // Tareas pertenecientes a la maestra y no al curso
  @OneToMany( () => Tarea, tarea => tarea.maestra )
  tareas: Tarea[]

  // Grados donde es maestra
  @ManyToMany( () => Grado, grado => grado.maestras )
  grados: Grado[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}