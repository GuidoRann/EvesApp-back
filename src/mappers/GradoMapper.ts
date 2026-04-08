import { DeepPartial } from 'typeorm';
import { Grado } from '../models/Grado';
import { CreateGradoDTO, GradoDTO } from '../types/types';

export class GradoMapper {
  static toDTO( grado: Grado ): GradoDTO {
    return {
      gradoId: grado.gradoId,
      escuela: grado.escuela,
      numero: grado.numero,
      turno: grado.turno,
      divisionAnual: grado.divisionAnual,
      maestraTitular: grado.maestraTitular,
      ListaMaterias: grado.ListaMaterias,
      listaAlumnos: grado.listaAlumnos,
      maestras: grado.maestras
    };
  }

  static toEntity( grado: CreateGradoDTO ): DeepPartial<Grado> {
    return {
      escuela: grado.escuela,
      numero: grado.numero,
      turno: grado.turno,
      divisionAnual: grado.divisionAnual,
      maestraTitular: grado.maestraTitular
    };
  }
}