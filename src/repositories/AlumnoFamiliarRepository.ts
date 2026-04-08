import { Repository } from 'typeorm';
import { AppDataSource } from '../db'
import { AlumnoFamiliar } from '../models/AlumnoFamiliar';

export const AlumnoFamiliarRepository: Repository< AlumnoFamiliar >  = AppDataSource.getRepository('AlumnoFamiliar');