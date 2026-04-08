import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Alumno } from '../models/Alumno';

export const AlumnoRepository: Repository< Alumno > = AppDataSource.getRepository('Alumno');