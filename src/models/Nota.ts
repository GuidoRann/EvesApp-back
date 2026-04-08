import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alumno } from './Alumno';
import { Materia } from './Materia';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn('uuid')
  notaId: string

  @Column()
  plazo: string // Primer trimestre, segundo trimestre, etc.

  @Column()
  letra: string
  
  @Column( { type: 'decimal', precision: 5, scale: 2 } )
  peso: number // Porcentaje para calcular promedio de numero a letra: NS = 20, S = 40, B = 60, MB = 80, E = 100

  @ManyToOne(() => Alumno, alumno => alumno.notas)
  alumno: Alumno;

  @ManyToOne(() => Materia)
  materia: Materia;
}