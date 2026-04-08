import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asistencia } from './Asistencia';
import { Nota } from './Nota';
import { Grado } from './Grado';
import { AlumnoFamiliar } from './AlumnoFamiliar';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn('uuid')
  alumnoId: string

  @Column()
  nombre: string

  @Column()
  apellido: string

  @Column()
  numeroDocumento: string

  @Column()
  direccion: string

  @Column( { type: 'date', nullable: true } ) 
  fechaNacimiento: Date;

  @ManyToOne( () => Grado, grado => grado.listaAlumnos )
  @JoinColumn( { name: 'grado_id' } )
  grado: Grado;

  @OneToMany(() => AlumnoFamiliar, af => af.alumno)
  familiares: AlumnoFamiliar[];

  @OneToMany( () => Asistencia, asistencia => asistencia.alumno )
  asistencias: Asistencia[];

  @OneToMany( () => Nota, nota => nota.alumno )
  notas: Nota[];

  @Column( 'simple-array', { nullable: true } )
  promediosTrimestrales: string[]; // Ej: ["85.5", "78.2", "90.1"]
  
  @Column( { type: 'decimal', precision: 5, scale: 2, nullable: true } )
  promedioFinal: number; // Una nota por trimestre y una final RECOMENDADA
}