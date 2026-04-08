import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Alumno } from './Alumno';
import { Familiar } from './Familiar';

@Entity()
export class AlumnoFamiliar {
  @PrimaryGeneratedColumn('uuid')
  alumnoFamiliarId: string;

  @ManyToOne(() => Alumno, alumno => alumno.familiares)
  alumno: Alumno;
  
  @ManyToOne(() => Familiar, familiar => familiar.alumnos)
  familiar: Familiar;
  
  @Column()
  parentesco: string; // 'PADRE', 'MADRE', 'ABUELO', 'TUTOR'
}