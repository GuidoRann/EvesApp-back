import { Alumno } from '../models/Alumno';
import { AlumnoFamiliar } from '../models/AlumnoFamiliar';
import { Asistencia } from '../models/Asistencia';
import { Escuela } from '../models/Escuela';
import { Familiar } from '../models/Familiar';
import { Grado } from '../models/Grado';
import { Maestra } from '../models/Maestra';
import { Materia } from '../models/Materia';
import { Nota } from '../models/Nota';
import { Tarea } from '../models/Tarea';

// -------------------- Alumno DTOs --------------------
export interface AlumnoDTO {
  alumnoId: string;
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  direccion: string;
  fechaNacimiento: Date;
  grado: Grado;
  familiares: AlumnoFamiliar[];
  asistencias: Asistencia[];
  notas: Nota[];
  promediosTrimestrales: string[];
  promedioFinal: number;
}

export type CreateAlumnoDTO = {
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  direccion: string;
  fechaNacimiento?: Date;
  grado?: Grado;
  familiares?: AlumnoFamiliar[];
}
export type UpdateAlumnoDTO = Partial< AlumnoDTO >
export type ResponseAlumnoDTO = AlumnoDTO

// -------------------- Parentesco DTOs --------------------

export interface AlumnoFamiliarDTO {
  alumnoFamiliarId: string;
  alumno: Alumno;
  familiar: Familiar;
  parentesco: string;
}

export type CreateAlumnoFamiliarDTO = Omit< AlumnoFamiliarDTO, 'id' >
export type UpdateAlumnoFamiliarDTO = Partial< CreateAlumnoFamiliarDTO >
export type ResponseAlumnoFamiliarDTO = AlumnoFamiliarDTO

// -------------------- Asistencias DTOs --------------------

export interface AsistenciaDTO {
  asistenciaId: string;
  fecha: Date;
  asistio: boolean;
  observaciones: string;
  alumno: Alumno;
}

export type CreateAsistenciaDTO = Omit< AsistenciaDTO, 'id' >
export type UpdateAsistenciaDTO = Partial< CreateAsistenciaDTO >
export type ResponseAsistenciaDTO = AsistenciaDTO

// -------------------- Escuela DTOs --------------------

export interface EscuelaDTO {
  escuelaId: string;
  nombre: string;
  numero: string;
  direccion: string;
  listaGrados: Grado[];
}

export type CreateEscuelaDTO = Omit< EscuelaDTO, 'id' >
export type UpdateEscuelaDTO = Partial< CreateEscuelaDTO >
export type ResponseEscuelaDTO = EscuelaDTO

// -------------------- Familiar DTOs --------------------

export interface FamiliarDTO {
  familiarId: string;
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  ocupacion: string;
  alumnos: AlumnoFamiliar[];
}

export type CreateFamiliarDTO = Omit< FamiliarDTO, 'id' >
export type UpdateFamiliarDTO = Partial< CreateFamiliarDTO >
export type ResponseFamiliarDTO = FamiliarDTO

// -------------------- Grado DTOs --------------------

export interface GradoDTO {
  gradoId: string;
  escuela: Escuela;
  numero: string;
  turno: string;
  divisionAnual: string;
  maestraTitular: Maestra;
  ListaMaterias: Materia[];
  listaAlumnos: Alumno[];
  maestras: Maestra[];
}

export type CreateGradoDTO = Omit< GradoDTO, 'id' >
export type UpdateGradoDTO = Partial< CreateGradoDTO >
export type ResponseGradoDTO = GradoDTO

// -------------------- Maestra DTOs --------------------

export interface MaestraDTO {
  maestraId?: string;
  supabaseUserId: string;
  nombre: string;
  apellido: string;
  email: string;
  escuelas: Escuela[];
  gradosComoTitular: Grado[];
  tareas: Tarea[];
  grados: Grado[];
}

export type CreateMaestraDTO = Omit< MaestraDTO, 'maestraId' >
export type UpdateMaestraDTO = Partial< CreateMaestraDTO >
export type ResponseMaestraDTO = MaestraDTO

// -------------------- Tareas DTOs --------------------

export interface TareaDTO {
  tareaId: string;
  descripcion: string;
  maestra: Maestra;
  expiracion: Date;
  completada: boolean
}

export interface CreateTareaDTO {
  descripcion: string;
  maestraId: string;
  expiracion: Date;
  completada?: boolean;
}

export type UpdateTareaDTO = Partial< CreateTareaDTO >
export type ResponseTareaDTO = TareaDTO

// -------------------- Materia DTOs --------------------

export interface MateriaDTO {
  materiaId: string;
  nombre: string;
  maestra: Maestra;
  grado: Grado;
}

export type CreateMateriaDTO = Omit< MateriaDTO, 'id' >
export type UpdateMateriaDTO = Partial< CreateMateriaDTO >
export type ResponseMateriaDTO = MateriaDTO

// -------------------- Nota DTOs --------------------

export interface NotaDTO {
  notaId: string;
  plazo: string;
  letra: string;
  peso: number;
  alumno: Alumno;
  materia: Materia;
}

export type CreateNotaDTO = Omit< NotaDTO, 'id' >
export type UpdateNotaDTO = Partial< CreateNotaDTO >
export type ResponseNotaDTO = NotaDTO