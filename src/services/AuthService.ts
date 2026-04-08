import { type Request, type Response } from 'express';
import { response } from '../common/Response';
import { logger } from '../common/logger';
import { MaestraMapper } from '../mappers/MaestraMapper';
import { MaestraRepository } from '../repositories/MaestraRepository';
import { CreateMaestraDTO } from '../types/types';

export const AuthService = {
  obtenerOCrearMaestra: async ( req: Request, res: Response ) => {
      try {
        const user = req.user;
    
        if( !user ) return res.status( 401 ).json({ message: 'Unauthorized' });
    
        let maestra = await MaestraRepository.findOne({
          where: { supabaseUserId: user.id }
        });
    
        if ( !maestra ) {
    
          const maestraDTO: CreateMaestraDTO = {
            supabaseUserId: user.id,
            email: user.email ?? '',
            nombre: user.user_metadata?.name ?? '',
            apellido: '',
            escuelas: [],
            gradosComoTitular: [],
            tareas: [],
            grados: []
          };
    
          maestra = await MaestraRepository.save( MaestraMapper.toEntity( maestraDTO ) );
        }
    
        return response.success( res, 200, 'Maestra obtenida/creada', maestra );
      } catch ( error ) {
        logger.error( error );
        response.error( res, error );
      }
    }
};