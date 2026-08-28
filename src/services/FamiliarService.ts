import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { response } from '../common/Response';
import { FamiliarMapper } from '../mappers/FamiliarMapper';
import { FamiliarRepository } from '../repositories/FamiliarRepository';
import { CreateAlumnoFamiliarDTO, CreateFamiliarDTO, ResponseFamiliarDTO } from '../types/types';
import { logger } from '../common/logger';
import { AppDataSource } from '../db';
import { Alumno } from '../models/Alumno';
import { AlumnoFamiliar } from '../models/AlumnoFamiliar';
import { Familiar } from '../models/Familiar';

interface Params {
  id: string;
}

export const FamiliarService = {
  crearFamiliar: async ( req: Request< {}, {}, CreateAlumnoFamiliarDTO >, res: Response ) => {
    try {
      const alumnoFamiliar = req.body;

      const resultado = await AppDataSource.transaction( async ( manager ) => {
        const alumno = await manager.findOne( Alumno, {
          where: {
            alumnoId: alumnoFamiliar.alumnoId,
          },
        });

        if ( !alumno ) {
          throw new Error("Alumno no encontrado");
        }

        const familiarEntity = FamiliarMapper.toEntity( alumnoFamiliar.familiar );

        const familiarCreado = await manager.save( Familiar, familiarEntity );

        const alumnoFamiliarEntity = manager.create( AlumnoFamiliar, {
          alumno,
          familiar: familiarCreado,
          parentesco: alumnoFamiliar.parentesco,
        } );

        await manager.save( AlumnoFamiliar, alumnoFamiliarEntity );

        return familiarCreado;
      });

      return response.success(res, 201, "Familiar creado", resultado);
    } catch (error) {
      logger.error(error);
      response.error(res, error);
    }
  },

  obtenerFamiliar: async (req: Request<Params>, res: Response) => {
    try {
      const {id} = req.params;
      const familiarResponse = await FamiliarRepository.findOneBy({familiarId: id});

      if (!familiarResponse) {
        throw new createError.NotFound("Familiar no encontrado");
      }

      const familiarObtenido: ResponseFamiliarDTO = FamiliarMapper.toDTO(familiarResponse);

      return response.success(res, 200, "Familiar obtenido", familiarObtenido);
    } catch (error) {
      logger.error(error);
      response.error(res, error);
    }
  },

  actualizarFamiliar: async (req: Request<Params, {}, {familiar: CreateFamiliarDTO}>, res: Response) => {
    try {
      const {id} = req.params;
      const {familiar} = req.body;

      const familiarActualizado = await FamiliarRepository.update(id, familiar);

      return response.success(res, 200, "Familiar actualizado", familiarActualizado);
    } catch (error) {
      logger.error(error);
      response.error(res, error);
    }
  },

  eliminarFamiliar: async (req: Request<Params>, res: Response) => {
    try {
      const {id} = req.params;
      const familiarEliminado = await FamiliarRepository.delete(id);

      return response.success(res, 200, "Familiar eliminado", familiarEliminado);
    } catch (error) {
      logger.error(error);
      response.error(res, error);
    }
  },
};