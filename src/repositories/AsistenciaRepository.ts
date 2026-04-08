import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Asistencia } from '../models/Asistencia';

export const AsistenciaRepository: Repository< Asistencia >  = AppDataSource.getRepository('Asistencia');