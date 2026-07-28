import { type Request, type Response } from 'express';
import { AlumnoRepository } from '../repositories/AlumnoRepository';
import { response } from '../common/Response';
import createError from 'http-errors';
import { CreateAlumnoDTO, ResponseAlumnoDTO, UpdateAlumnoDTO } from '../types/types';
import { AlumnoMapper } from '../mappers/AlumnoMapper';
import { logger } from '../common/logger';

interface Params {
  id: string;
}

export const AlumnoService = {
  obtenerAlumno: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const alumnoResponse = await AlumnoRepository.findOneBy( { alumnoId: id } );

      if (!alumnoResponse) {
        throw new createError.NotFound('Alumno no encontrado');
      }

      const alumnoObtenido: ResponseAlumnoDTO = AlumnoMapper.toDTO( alumnoResponse );

      return response.success( res, 200, 'Alumno obtenido', alumnoObtenido );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },
  
  crearAlumno: async ( req: Request< {}, {}, CreateAlumnoDTO >, res: Response ) => {
    try {
      const alumno = req.body;

      const alumnoCreado = await AlumnoRepository.save( alumno );
      
      return response.success( res, 201, 'Alumno creado', alumnoCreado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );         
    }
  },

  actualizarAlumno: async ( req: Request< Params, {}, { alumno: UpdateAlumnoDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const { alumno } = req.body;

      const alumnoActualizado = await AlumnoRepository.update( id , alumno );

      return response.success( res, 200, 'Alumno actualizado', alumnoActualizado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );         
    }
  },

  eliminarAlumno: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const alumnoEliminado = await AlumnoRepository.delete( id );
     
      return response.success( res, 200, 'Alumno eliminado', alumnoEliminado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  } 
};