import { PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, Entity } from 'typeorm';
import { Maestra } from './Maestra';
import { Escuela } from './Escuela';
import { Alumno } from './Alumno';
import { Materia } from './Materia';

@Entity()
export class Grado {
  @PrimaryGeneratedColumn('uuid')
  gradoId: string
  
  @ManyToOne( () => Escuela, escuela => escuela.listaGrados )
  escuela: Escuela;
  
  @Column()
  numero: string;
  
  @Column()
  letra: string;
  
  @Column()
  turno: string;

  @Column()
  divisionAnual: string;

  @ManyToOne( () => Maestra, maestra => maestra.gradosComoTitular )
  @JoinColumn( { name: 'maestra_titular_id' } )
  maestraTitular: Maestra;

  @ManyToMany( () => Maestra, maestra => maestra.grados )
  @JoinTable()
  maestras: Maestra[];
  
  @OneToMany( () => Alumno, alumno => alumno.grado )
  listaAlumnos: Alumno[];
}