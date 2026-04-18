import { DeepPartial } from 'typeorm';
import { Maestra } from '../models/Maestra';
import { CreateMaestraDTO, MaestraDTO } from '../types/types';

export class MaestraMapper {
  static toDTO( maestra: Maestra ): MaestraDTO {
    return {
      maestraId: maestra.maestraId,
      supabaseUserId: maestra.supabaseUserId,
      nombre: maestra.nombre,
      apellido: maestra.apellido,
      email: maestra.email,
      avatar_url: maestra.avatar_url,
      escuelas: maestra.escuelas,
      gradosComoTitular: maestra.gradosComoTitular,
      tareas: maestra.tareas,
      grados: maestra.grados
    };
  }

  static toEntity( maestra: CreateMaestraDTO ): DeepPartial<Maestra> {
    return {
      supabaseUserId: maestra.supabaseUserId,
      nombre: maestra.nombre,
      apellido: maestra.apellido,
      email: maestra.email,
      avatar_url: maestra.avatar_url
    };
  }
}