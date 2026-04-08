import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { response } from '../common/Response';
import { FamiliarMapper } from '../mappers/FamiliarMapper';
import { FamiliarRepository } from '../repositories/FamiliarRepository';
import { CreateFamiliarDTO, ResponseFamiliarDTO } from '../types/types';
import { logger } from '../common/logger';

interface Params {
  id: string;
}

export const FamiliarService = {
  obtenerFamiliar: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const familiarResponse = await FamiliarRepository.findOneBy( { familiarId: id } );

      if (!familiarResponse) {
        throw new createError.NotFound('Familiar no encontrado');
      }

      const familiarObtenido: ResponseFamiliarDTO = FamiliarMapper.toDTO( familiarResponse );

      return response.success( res, 200, 'Familiar obtenido', familiarObtenido );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );    
    }
  },

  crearFamiliar: async ( req: Request< {}, {}, { familiar: CreateFamiliarDTO } >, res: Response ) => {
    try {
      const { familiar } = req.body;
      const familiarEntity = FamiliarMapper.toEntity( familiar );
      
      const familiarCreado = await FamiliarRepository.save( familiarEntity );

      return response.success( res, 201, 'Familiar creado', familiarCreado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  actualizarFamiliar: async ( req: Request< Params, {}, { familiar: CreateFamiliarDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const { familiar } = req.body;

      const familiarActualizado = await FamiliarRepository.update( id, familiar );

      return response.success( res, 200, 'Familiar actualizado', familiarActualizado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  eliminarFamiliar: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const familiarEliminado = await FamiliarRepository.delete( id );

      return response.success( res, 200, 'Familiar eliminado', familiarEliminado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  }
};