import { DeepPartial } from 'typeorm';
import { Asistencia } from '../models/Asistencia';
import { AsistenciaDTO, CreateAsistenciaDTO } from '../types/types';

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

  static toEntity( asistencia: CreateAsistenciaDTO ): DeepPartial< Asistencia > {
    return {
      fecha: asistencia.fecha,
      asistio: asistencia.asistio,
      observaciones: asistencia.observaciones,
      alumno: asistencia.alumno
    }
  }
};