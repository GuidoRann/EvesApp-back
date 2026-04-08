import { Repository } from 'typeorm';
import { Tareas } from '../models/Tarea';
import { AppDataSource } from '../db';

export const TareasRepository: Repository< Tareas > = AppDataSource.getRepository('Tareas');