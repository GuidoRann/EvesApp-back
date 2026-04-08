import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Grado } from '../models/Grado';

export const GradoRepository: Repository< Grado > = AppDataSource.getRepository('Grado');