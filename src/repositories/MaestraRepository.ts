import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Maestra } from '../models/Maestra';

export const MaestraRepository: Repository< Maestra > = AppDataSource.getRepository('Maestra');