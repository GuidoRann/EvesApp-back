import { DeepPartial } from 'typeorm';
import { Alumno } from '../models/Alumno';
import { CreateAlumnoDTO, ResponseAlumnoDTO } from '../types/types';

export class AlumnoMapper {
  
  static toDTO( alumno: Alumno ): ResponseAlumnoDTO {
    return {
      alumnoId: alumno.alumnoId,
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      numeroDocumento: alumno.numeroDocumento,
      fechaNacimiento: alumno.fechaNacimiento,
      direccion: alumno.direccion,
      familiares: alumno.familiares,
      grado: alumno.grado,
      asistencias: alumno.asistencias,
      notas: alumno.notas,
      promediosTrimestrales: alumno.promediosTrimestrales,
      promedioFinal: alumno.promedioFinal,
    }
  }

  static toEntity( alumno: CreateAlumnoDTO ): DeepPartial< Alumno > {
    return {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      numeroDocumento: alumno.numeroDocumento,
      direccion: alumno.direccion,
      ...( alumno.fechaNacimiento && { fechaNacimiento: alumno.fechaNacimiento }),
      ...( alumno.familiares && { familiares: alumno.familiares }),
    }
  }
  
}