import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlumnoFamiliar } from './AlumnoFamiliar';

@Entity()
export class Familiar {
  @PrimaryGeneratedColumn('uuid')
  familiarId: string;

  @Column()
  nombre: string;
  
  @Column()
  apellido: string;
  
  @Column()
  direccion: string;
  
  @Column()
  numeroTelefono: string;
  
  @Column()
  ocupacion: string;

  @OneToMany(() => AlumnoFamiliar, af => af.familiar)
  alumnos: AlumnoFamiliar[];
}