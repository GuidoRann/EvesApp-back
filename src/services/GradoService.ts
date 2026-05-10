import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { GradoRepository } from '../repositories/GradoRepository';
import { logger } from '../common/logger';
import { response } from '../common/Response';

interface Params {
  id: string;
}

export const GradoService = {
  crearGrado: async ( req: Request, res: Response ) => {
    try {
      const grado = await GradoRepository.save( req.body );

      return response.success( res, 201, 'Grado creado', grado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );       
    }
  },

  obtenerGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const gradoObtenido = await GradoRepository.findOneBy( { gradoId: id } );

      if (!gradoObtenido) {
        throw new createError.NotFound('Grado no encontrado');
      }

      return response.success( res, 200, 'Grado obtenido', gradoObtenido );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );    
    }
  },

  obtenerListaDeGrados: async ( req: Request, res: Response ) => {
    try {
      const grados = await GradoRepository.find();
      
      return response.success( res, 200, 'Grados obtenidos', grados );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },

  actualizarGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;

      const gradoExistente = await GradoRepository.findOneBy( { gradoId: id } );

      if ( !gradoExistente ) {
        return response.error( res, new createError.NotFound('Grado no encontrado') );
      }

      const actualizado = GradoRepository.merge( gradoExistente, req.body );

      const gradoActualizado = await GradoRepository.save( actualizado );
      
      return response.success( res, 200, 'Grado actualizado', gradoActualizado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },

  eliminarGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
     
      const gradoEliminado = await GradoRepository.delete( id );
     
      return response.success( res, 200, 'Grado eliminado', gradoEliminado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );       
    }
  },
};