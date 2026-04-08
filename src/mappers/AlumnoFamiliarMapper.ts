import { DeepPartial } from 'typeorm';
import { AlumnoFamiliar } from '../models/AlumnoFamiliar';
import { AlumnoFamiliarDTO, CreateAlumnoFamiliarDTO } from '../types/types';

export class AlumnoFamiliarMapper {
  static toDTO( alumnoFamiliar: AlumnoFamiliar ): AlumnoFamiliarDTO {
    return {
      alumnoFamiliarId: alumnoFamiliar.alumnoFamiliarId,
      alumno: alumnoFamiliar.alumno,
      familiar: alumnoFamiliar.familiar,
      parentesco: alumnoFamiliar.parentesco
    }
  }

  static toEntity( alumnoFamiliar: CreateAlumnoFamiliarDTO): DeepPartial< AlumnoFamiliar >  {
    return {
      alumno: alumnoFamiliar.alumno,
      familiar: alumnoFamiliar.familiar,
      parentesco: alumnoFamiliar.parentesco
    }
  }
}