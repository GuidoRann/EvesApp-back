import { DeepPartial } from 'typeorm';
import { Escuela } from '../models/Escuela';
import { CreateEscuelaDTO, EscuelaDTO } from '../types/types';

export class EscuelaMapper {
  static toDTO( escuela: Escuela): EscuelaDTO {
    return {
      escuelaId: escuela.escuelaId,
      nombre: escuela.nombre,
      numero: escuela.numero,
      direccion: escuela.direccion,
      listaGrados: escuela.listaGrados,
    };
  }

  static toEntity(escuela: CreateEscuelaDTO): DeepPartial<Escuela> {
    return {
      nombre: escuela.nombre,
      numero: escuela.numero,
      direccion: escuela.direccion,
    };
  }
}