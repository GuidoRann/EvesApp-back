import { DeepPartial } from 'typeorm';
import { Materia } from '../models/Materia';
import { CreateMateriaDTO, MateriaDTO } from '../types/types';

export class MateriaMapper {
  static toDTO( materia: Materia ): MateriaDTO {
    return {
      materiaId: materia.materiaId,
      nombre: materia.nombre,
      maestra: materia.maestra,
      grado: materia.grado
    };
  }

  static toEntity( materia: CreateMateriaDTO ): DeepPartial<Materia> {
    return {
      nombre: materia.nombre,
      maestra: materia.maestra,
      grado: materia.grado
    };
  }
}