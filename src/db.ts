import { DataSource } from 'typeorm';
import { Alumno } from './models/Alumno';
import { AlumnoFamiliar } from './models/AlumnoFamiliar';
import { Asistencia } from './models/Asistencia';
import { Escuela } from './models/Escuela';
import { Familiar } from './models/Familiar';
import { Grado } from './models/Grado';
import { Maestra } from './models/Maestra';
import { Materia } from './models/Materia';
import { Nota } from './models/Nota';
import { Tarea } from './models/Tarea';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "evesapp",
    synchronize: true,
    logging: true,
    entities: [ 
      Alumno,
      AlumnoFamiliar,
      Asistencia,
      Escuela,
      Familiar,
      Grado,
      Maestra,
      Materia,
      Tarea,
      Nota
     ]
})