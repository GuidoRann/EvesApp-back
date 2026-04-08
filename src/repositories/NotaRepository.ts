import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Nota } from '../models/Nota';

export const NotaRepository: Repository< Nota > = AppDataSource.getRepository('Nota');