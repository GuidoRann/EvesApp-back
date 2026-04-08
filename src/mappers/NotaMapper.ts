import { DeepPartial } from 'typeorm';
import { Nota } from '../models/Nota';
import { CreateNotaDTO, NotaDTO } from '../types/types';

export class NotaMapper {
  static toDTO( nota: Nota ): NotaDTO {
    return {
      notaId: nota.notaId,
      plazo: nota.plazo,
      letra: nota.letra,
      peso: nota.peso,
      alumno: nota.alumno,
      materia: nota.materia
    };
  }

  static toEntity( nota: CreateNotaDTO ): DeepPartial<Nota> {
    return {
      plazo: nota.plazo,
      letra: nota.letra,
      peso: nota.peso,
      alumno: nota.alumno,
      materia: nota.materia
    };
  }
}