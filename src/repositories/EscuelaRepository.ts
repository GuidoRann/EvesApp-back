import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Escuela } from '../models/Escuela';

export const EscuelaRepository: Repository< Escuela > = AppDataSource.getRepository('Escuela');