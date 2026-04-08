import { DeepPartial } from 'typeorm';
import { Familiar } from '../models/Familiar';
import { CreateFamiliarDTO, FamiliarDTO } from '../types/types';

export class FamiliarMapper {
  static toDTO( familiar: Familiar ): FamiliarDTO {
    return {
      familiarId: familiar.familiarId,
      nombre: familiar.nombre,
      apellido: familiar.apellido,
      direccion: familiar.direccion,
      numeroTelefono: familiar.numeroTelefono,
      ocupacion: familiar.ocupacion,
      alumnos: familiar.alumnos
    };
  }

  static toEntity( familiar: CreateFamiliarDTO): DeepPartial< Familiar > {
    return {
      nombre: familiar.nombre,
      apellido: familiar.apellido,
      direccion: familiar.direccion,
      numeroTelefono: familiar.numeroTelefono,
      ocupacion: familiar.ocupacion,
    };
  }

}