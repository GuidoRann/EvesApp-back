import { type Request, type Response } from 'express';
import { AlumnoFamiliarRepository } from '../repositories/AlumnoFamiliarRepository';
import { AlumnoFamiliarMapper } from '../mappers/AlumnoFamiliarMapper';
import { CreateAlumnoFamiliarDTO, ResponseAlumnoFamiliarDTO } from '../types/types';
import createError from 'http-errors';
import { response } from '../common/Response';
import { logger } from '../common/logger';

interface Params {
  id: string;
  alumnoId: string
}

export const AlumnoFamiliarService = {
  obtenerAlumnoFamiliar: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const alumnoFamiliarResponse = await AlumnoFamiliarRepository.findOneBy( { alumnoFamiliarId: id } );

      if (!alumnoFamiliarResponse) {
        throw new createError.NotFound('Alumno familiar no encontrado');
      }

      const AlumnoFamiliarObtenido: ResponseAlumnoFamiliarDTO = AlumnoFamiliarMapper.toDTO( alumnoFamiliarResponse );

      return response.success( res, 200, 'Alumno familiar obtenido', AlumnoFamiliarObtenido );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }    
  },

  obtenerFamiliaresPorAlumno: async ( req: Request< Params >, res: Response ) => {
    try {
      const { alumnoId } = req.params;
      const familiares = await AlumnoFamiliarRepository.find( { 
        where: {
          alumno: { alumnoId }
        },
        relations: [ 'familiar' ]
       } );
      return response.success( res, 200, 'Familiares obtenidos', familiares );
    } catch (error) {
      
    }
  },

  crearAlumnoFamiliar: async ( req: Request< {}, {}, { alumnoFamiliar: CreateAlumnoFamiliarDTO } >, res: Response ) => {
    try {
      const { alumnoFamiliar } = req.body;

      const alumnoFamiliarEntity = AlumnoFamiliarMapper.toEntity( alumnoFamiliar );

      const alumnoFamiliarCreado = await AlumnoFamiliarRepository.save( alumnoFamiliarEntity );
      return response.success( res, 201, 'Alumno familiar creado', alumnoFamiliarCreado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  actualizarAlumnoFamiliar: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      
      const alumnoObtenido = await AlumnoFamiliarRepository.findOneBy( { alumnoFamiliarId: id } );

      if (!alumnoObtenido) {
        throw new createError.NotFound('Alumno familiar no encontrado');
      }

      const alumnoFamiliarActualizado = await AlumnoFamiliarRepository.update( id , alumnoObtenido );

      return response.success( res, 200, 'Alumno familiar actualizado', alumnoFamiliarActualizado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

  eliminarAlumnoFamiliar : async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const alumnoFamiliarEliminado = await AlumnoFamiliarRepository.delete( id );

      return response.success( res, 200, 'Alumno familiar eliminado', alumnoFamiliarEliminado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  }
};