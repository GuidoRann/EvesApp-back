import { DeepPartial } from 'typeorm';
import { Tarea } from '../models/Tarea';
import { CreateTareaDTO, TareaDTO } from '../types/types';
import { Maestra } from '../models/Maestra';

export class TareasMapper {
  static toDTO(tarea: Tarea): TareaDTO {
    return {
      tareaId: tarea.tareaId,
      descripcion: tarea.descripcion,
      maestra: tarea.maestra,
      expiracion: tarea.expiracion,
      completada: tarea.completada
    };
  }

  static toDTOList(tareas: Tarea[]): TareaDTO[] {
    return tareas.map(this.toDTO);
  } 

  static toEntity(dto: CreateTareaDTO): DeepPartial<Tarea> {
  return {
    descripcion: dto.descripcion,
    expiracion: dto.expiracion,
    completada: dto.completada ?? false,
    maestra: {
      maestraId: dto.maestraId
    } as Maestra
  };
}
}