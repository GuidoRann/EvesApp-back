import { type Request, type Response } from "express";
import createError from "http-errors";
import { response } from '../common/Response';
import { EscuelaMapper } from '../mappers/EscuelaMapper';
import { CreateEscuelaDTO, ResponseEscuelaDTO, UpdateEscuelaDTO } from '../types/types';
import { EscuelaRepository } from '../repositories/EscuelaRepository';
import { logger } from '../common/logger';
import { MaestraRepository } from '../repositories/MaestraRepository';

interface Params {
  id: string
}

export const EscuelaService = {
  obtenerEscuela: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const escuelaResponse = await EscuelaRepository.findOneBy( { escuelaId: id } );

      if (!escuelaResponse) {
        throw new createError.NotFound('Escuela no encontrada');
      };

      const escuelaObtenida: ResponseEscuelaDTO = EscuelaMapper.toDTO( escuelaResponse );

      return response.success( res, 200, 'Escuela obtenida', escuelaObtenida );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  obtenerListaDeEscuelas: async ( req: Request, res: Response ) => {
    try {
      const escuelas = await EscuelaRepository.find();
   
      return response.success( res, 200, 'Escuelas obtenidas', escuelas );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  crearEscuela: async ( req: Request< {}, {}, CreateEscuelaDTO >, res: Response ) => {
    try {
      const escuelaEntity = EscuelaMapper.toEntity( req.body );
      
      const escuelaCreada = await EscuelaRepository.save( escuelaEntity );
      
      return response.success( res, 201, 'Escuela creada', escuelaCreada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  unirmeAUnaEscuela: async ( req: Request< Params, {}, { escuela: UpdateEscuelaDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const user = req.user;

      if (!user) {
        throw new Error("Token inválido");
      }
      
      const escuela = await EscuelaRepository.findOne({
        where: { escuelaId: id },
        relations: {
          maestras: true,
        },
      });

      const maestra = await MaestraRepository.findOne({
        where: {
          supabaseUserId: user.id
        }
      });

      if (!escuela) {
        throw new Error("Escuela no encontrada");
      }

      if (!maestra) {
        throw new Error("Maestra no encontrada");
      }

      escuela.maestras.push( maestra );

      const escuelaActualizada = await EscuelaRepository.save(escuela);
      return response.success( res, 200, 'Escuela actualizada', escuelaActualizada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  actualizarEscuela: async ( req: Request< Params, {}, { escuela: UpdateEscuelaDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const { escuela } = req.body;
      
      const escuelaActualizada = await EscuelaRepository.update( id, escuela );
      
      return response.success( res, 200, 'Escuela actualizada', escuelaActualizada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  eliminarEscuela: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      
      const escuelaEliminada = await EscuelaRepository.delete( id );
      
      return response.success( res, 200, 'Escuela eliminada', escuelaEliminada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  }
};