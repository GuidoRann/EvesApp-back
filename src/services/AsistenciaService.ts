import {  type Request, type Response } from 'express';
import createError from 'http-errors';
import { AsistenciaMapper } from '../mappers/AsistenciaMapper';
import { AsistenciaRepository } from '../repositories/AsistenciaRepository';
import { CreateAsistenciaDTO, ResponseAsistenciaDTO, UpdateAsistenciaDTO } from '../types/types';
import { response } from '../common/Response';
import { logger } from '../common/logger';

interface Params {
  id: string;
}

export const AsistenciaService = {
  obtenerAsistencia: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;

      const asistenciaResponse = await AsistenciaRepository.findOneBy( { asistenciaId: id } );

      if (!asistenciaResponse) {
        throw new createError.NotFound('Asistencia no encontrada');
      }

      const asistenciaObtenida: ResponseAsistenciaDTO = AsistenciaMapper.toDTO( asistenciaResponse );

      return response.success( res, 200, 'Asistencia obtenida', asistenciaObtenida );
    } catch (error) {
      logger.error( error );
      response.error( res, error );
    }
  },

  crearAsistencia: async ( req: Request< {}, {}, { asistencia: CreateAsistenciaDTO } >, res: Response ) => {
    try {
      const { asistencia } = req.body;

      const asistenciaEntity = AsistenciaMapper.toEntity( asistencia ); 

      const asistenciaCreada = await AsistenciaRepository.save( asistenciaEntity );

      return response.success( res, 201, 'Asistencia creada', asistenciaCreada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  actualizarAsistencia: async ( req: Request< Params, {}, { asistencia: UpdateAsistenciaDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const { asistencia } = req.body;

      const asistenciaActualizada = await AsistenciaRepository.update( id, asistencia );

      return response.success( res, 200, 'Asistencia actualizada', asistenciaActualizada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  eliminarAsistencia: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;

      const asistenciaEliminada = await AsistenciaRepository.delete( id );

      return response.success( res, 200, 'Asistencia eliminada', asistenciaEliminada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  }
};