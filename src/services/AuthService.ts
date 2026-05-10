import { type Request, type Response } from 'express';
import { response } from '../common/Response';
import createError from 'http-errors';
import { logger } from '../common/logger';
import { MaestraMapper } from '../mappers/MaestraMapper';
import { MaestraRepository } from '../repositories/MaestraRepository';
import { CreateMaestraDTO } from '../types/types';

export const AuthService = {
  obtenerOCrearMaestra: async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        return response.error(res, new createError.Unauthorized('Token inválido'));
      }

      const maestraDTO: CreateMaestraDTO = {
        supabaseUserId: user.id,
        email: user.email ?? '',
        nombre: user.user_metadata?.full_name ?? '',
        apellido: user.user_metadata?.family_name ?? '',
        avatar_url: user.user_metadata?.avatar_url ?? '',
        escuelas: [],
        gradosComoTitular: [],
        tareas: [],
        grados: []
      };
      
      let maestra = await MaestraRepository.findOne({
        where: { supabaseUserId: user.id }
      });

      if (!maestra) {
        maestra = MaestraRepository.create(
          MaestraMapper.toEntity( maestraDTO )
        );

        await MaestraRepository.save( maestra );
      }

      return response.success(res, 200, 'Maestra obtenida/creada', maestra);

    } catch (error) {
      logger.error(error);
      response.error(res, error);
    }
  }
};