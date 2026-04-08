import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { Familiar } from '../models/Familiar';

export const FamiliarRepository: Repository< Familiar > = AppDataSource.getRepository('Familiar');