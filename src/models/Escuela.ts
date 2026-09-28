import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToMany } from 'typeorm';
import { Grado } from './Grado';
import { Maestra } from './Maestra';

@Entity()
export class Escuela {
  @PrimaryGeneratedColumn('uuid')
  escuelaId: string

  @Column()
  nombre: string

  @Column( { unique: true } )
  numero: string

  @Column()
  direccion: string

  @Column({ nullable: true })
  telefono: string;

  @OneToMany( () => Grado, grado => grado.escuela )
  listaGrados: Grado[]

  @ManyToMany(() => Maestra, maestra => maestra.escuelas)
  maestras: Maestra[];
}