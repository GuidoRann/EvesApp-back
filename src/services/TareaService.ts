import { type Request, type Response } from 'express';
import { logger } from '../common/logger';
import { response } from '../common/Response';
import { TareasRepository } from '../repositories/TareaRepository';
import createError from 'http-errors';
import { CreateTareaDTO, ResponseTareaDTO } from '../types/types';
import { TareasMapper } from '../mappers/TareaMapper';
import { Tarea } from '../models/Tarea';

interface Params {
  maestraId: string;
}

export const TareaService = {
  obtenerTareas: async ( req: Request< Params >, res: Response ) => {
    try {
      const { maestraId } = req.params;
      const tareasResponse = await TareasRepository.find({
        where: {
          maestra: {
            maestraId: maestraId
          }
        }
      });

      if (tareasResponse.length === 0) {
      throw new createError.NotFound('Tareas no encontradas');
    }

      const tareasObtenidas: ResponseTareaDTO[] = TareasMapper.toDTOList( tareasResponse );

      return response.success( res, 200, 'Tareas obtenidas', tareasObtenidas );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  },

  crearTarea: async ( req: Request< {}, {}, { tarea: CreateTareaDTO } >, res: Response ) => {
    try {
      const { tarea } = req.body;

      const tareaEntity = TareasMapper.toEntity( tarea );

      const tareaCreada = await TareasRepository.save( tareaEntity );

      return response.success( res, 201, 'Tarea creada', tareaCreada );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );      
    }
  }


}