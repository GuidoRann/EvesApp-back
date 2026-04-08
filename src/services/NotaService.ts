import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { logger } from '../common/logger';
import { NotaRepository } from '../repositories/NotaRepository';
import { response } from '../common/Response';
import { CreateNotaDTO } from '../types/types';
import { NotaMapper } from '../mappers/NotaMapper';

interface Params {
  id: string;
}

export const NotaService = {
  obtenerNota: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const nota = await NotaRepository.findOneBy( { notaId: id } );

      if (!nota) {
        throw new createError.NotFound('Nota no encontrada');
      }

      return response.success( res, 200, 'Nota obtenida', nota );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  obtenerNotas: async ( req: Request, res: Response ) => {
    try {
      const notas = await NotaRepository.find();
      return response.success( res, 200, 'Notas obtenidas', notas );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  crearNota: async ( req: Request< {}, {}, { nota: CreateNotaDTO } >, res: Response ) => {
    try {
      const { nota } = req.body;
      const notaEntity = NotaMapper.toEntity( nota );

      const notaCreada = await NotaRepository.save( notaEntity );

      return response.success( res, 201, 'Nota creada', notaCreada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  actualizarNota: async ( req: Request< Params, {}, { nota: CreateNotaDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const { nota } = req.body;

      const notaActualizada = await NotaRepository.update( id, nota );

      return response.success( res, 200, 'Nota actualizada', notaActualizada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  eliminarNota: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const notaEliminada = await NotaRepository.delete( id );

      return response.success( res, 200, 'Nota eliminada', notaEliminada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  }
};