import { DeepPartial } from 'typeorm';
import { Maestra } from '../models/Maestra';
import { MaestraDTO } from '../types/types';

export class MaestraMapper {
  static toDTO( maestra: Maestra ): MaestraDTO {
    return {
      maestraId: maestra.maestraId,
      supabaseUserId: maestra.supabaseUserId,
      nombre: maestra.nombre,
      apellido: maestra.apellido,
      email: maestra.email,
      escuelas: maestra.escuelas,
      gradosComoTitular: maestra.gradosComoTitular,
      tareas: maestra.tareas,
      grados: maestra.grados
    };
  }

  static toEntity( maestra: MaestraDTO ): DeepPartial<Maestra> {
    return {
      nombre: maestra.nombre,
      apellido: maestra.apellido,
      email: maestra.email,
    };
  }
}