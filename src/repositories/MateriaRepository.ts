import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Materia } from '../models/Materia';

export const MateriaRepository: Repository< Materia > = AppDataSource.getRepository('Materia');