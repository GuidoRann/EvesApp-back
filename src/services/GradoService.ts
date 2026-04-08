import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { GradoRepository } from '../repositories/GradoRepository';
import { logger } from '../common/logger';
import { response } from '../common/Response';

interface Params {
  id: string;
}

export const GradoService = {
  obtenerGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const gradoObtenido = await GradoRepository.findOneBy( { gradoId: id } );

      if (!gradoObtenido) {
        throw new createError.NotFound('Grado no encontrado');
      }

      return res.status( 200 ).json( gradoObtenido );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );    
    }
  },

  obtenerGrados: async ( req: Request, res: Response ) => {
    try {
      const grados = await GradoRepository.find();
      
      return res.status( 200 ).json( grados );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },

  crearGrado: async ( req: Request, res: Response ) => {
    try {
      const grado = await GradoRepository.save( req.body );
      return res.status( 201 ).json( grado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );       
    }
  },

  actualizarGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const gradoActualizado = await GradoRepository.update( id, req.body );
      return res.status( 200 ).json( gradoActualizado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },

  eliminarGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const gradoEliminado = await GradoRepository.delete( id );
      return res.status( 200 ).json( gradoEliminado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );       
    }
  },
};