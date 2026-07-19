import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { MaestraRepository } from '../repositories/MaestraRepository';
import { ResponseMaestraDTO, UpdateMaestraDTO } from '../types/types';
import { MaestraMapper } from '../mappers/MaestraMapper';
import { response } from '../common/Response';
import { logger } from '../common/logger';

interface Params {
  id: string;
}

export const MaestraService = {
  obtenerMaestra: async ( req: Request< Params >, res: Response ) => {
    try {
      if( !req.user?.id ) return res.status( 401 ).json({ message: 'Unauthorized' });

      const maestraResponse = await MaestraRepository.findOne( { 
        where: { 
          supabaseUserId: req.user.id  
        },
        relations: {
          escuelas: true,
          grados: true,
          gradosComoTitular: true
        }
       } );

      if (!maestraResponse) {
        throw new createError.NotFound('Maestra no encontrada');
      };

      const maestraObtenida: ResponseMaestraDTO = MaestraMapper.toDTO( maestraResponse );

      return response.success( res, 200, 'Maestra obtenida', maestraObtenida );
    } catch (error) {
      logger.error( error );
      response.error( res, error );    
    }
  },

  obtenerPerfil: async (req: Request, res: Response) => {
    try {
      if( !req.user?.id ) return res.status( 401 ).json({ message: 'Unauthorized' });
  
      const maestra = await MaestraRepository.findOne({
        where: { 
          supabaseUserId: req.user.id 
        },
        relations: {
          escuelas: {
            listaGrados: true,
            maestras: true,
          },
          grados: true,
          gradosComoTitular: true
        }
      });
  
      if ( !maestra ) {
        throw new createError.NotFound('Maestra no encontrada');
      }
  
      return response.success( res, 200, 'Perfil obtenido', maestra );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },

  obtenerListaDeMaestras: async ( req: Request, res: Response ) => {
    try {
      const maestras = await MaestraRepository.find();
   
      return response.success( res, 200, 'Maestras obtenidas', maestras );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );  
    }
  },

  actualizarMaestra: async ( req: Request< Params, {}, UpdateMaestraDTO >, res: Response ) => {
    try {
      const { id } = req.params;
      const maestra = req.body;

      const existente = await MaestraRepository.findOneBy( { maestraId: id } );

      if ( !existente ) {
        return response.error( res, new createError.NotFound('Maestra no encontrada') );
      }

      const actualizada = MaestraRepository.merge( existente, maestra );

      const maestraActualizada = await MaestraRepository.save( actualizada );

      return response.success( res, 200, 'Maestra actualizada', maestraActualizada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );  
    }
  },

  eliminarMaestra: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
    
      const maestraEliminada = await MaestraRepository.delete( id );
    
      return response.success( res, 200, 'Maestra eliminada', maestraEliminada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );  
    }
  }
};