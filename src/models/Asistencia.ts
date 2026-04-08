import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alumno } from './Alumno';

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn('uuid')
  asistenciaId: string;

  @Column( { type: 'date' } )
  fecha: Date;

  @Column( { default: false } )
  asistio: boolean;
 
  @Column( { nullable: true } )
  observaciones: string; 

  @ManyToOne(() => Alumno, alumno => alumno.asistencias)
  @JoinColumn({ name: 'alumno_id' })
  alumno: Alumno;
}