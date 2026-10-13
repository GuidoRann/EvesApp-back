import { DeepPartial } from 'typeorm';
import { Asistencia } from '../models/Asistencia';
import { AlumnoDTO, AsistenciaAlumnoDTO, AsistenciaDTO } from '../types/types';

export class AsistenciaMapper {
  static toDTO( asistencia: Asistencia ): AsistenciaDTO {
    return {
      asistenciaId: asistencia.asistenciaId,
      fecha: asistencia.fecha,
      asistio: asistencia.asistio,
      observaciones: asistencia.observaciones,
      alumno: asistencia.alumno
    }
  }

  static toEntity( asistencia: AsistenciaDTO ): DeepPartial<Asistencia> {
    return {
      fecha: asistencia.fecha,
      asistio: asistencia.asistio,
      observaciones: asistencia.observaciones,
      alumno: asistencia.alumno
    }
  }
};