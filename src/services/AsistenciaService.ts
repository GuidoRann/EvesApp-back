import {  type Request, type Response } from 'express';
import createError from 'http-errors';
import { AsistenciaMapper } from '../mappers/AsistenciaMapper';
import { AsistenciaRepository } from '../repositories/AsistenciaRepository';
import { AsistenciaAlumnoDTO, AsistenciaDTO, CreateAsistenciaDTO, ResponseAsistenciaDTO, UpdateAsistenciaDTO } from '../types/types';
import { response } from '../common/Response';
import { logger } from '../common/logger';
import { AlumnoRepository } from '../repositories/AlumnoRepository';
import { AppDataSource } from '../db';
import { Asistencia } from '../models/Asistencia';
import { Alumno } from '../models/Alumno';

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

  obtenerPorFecha: async ( req: Request, res: Response ) => {
    try {
      const { fecha } = req.params;
      
      if (!fecha) {
        throw new createError.BadRequest('Fecha no proporcionada');
      }

      if (typeof fecha !== 'string') {
        throw new createError.BadRequest('Fecha inválida');
      }

      const fechaBuscada = new Date(
        Number(fecha.substring(0, 4)),
        Number(fecha.substring(5, 7)) - 1,
        Number(fecha.substring(8, 10))
      );
      
      const asistenciasResponse = await AsistenciaRepository.find( {
        where: {
          fecha: fechaBuscada
        },
        relations: {
          alumno: true
        }
      } );

      if (asistenciasResponse.length === 0) {
        throw new createError.NotFound('Asistencias no encontradas');
      }

      const asistenciasObtenidas: ResponseAsistenciaDTO[] = AsistenciaMapper.toDTOList( asistenciasResponse );

      return response.success( res, 200, 'Asistencias obtenidas', asistenciasObtenidas );
    } catch (error) {
      logger.error( error );
      response.error( res, error );
    }
  },

  crearAsistencia: async (
    req: Request<{}, {}, CreateAsistenciaDTO>,
    res: Response
  ) => {
    try {
      const { fecha, alumnos } = req.body;

      const resultado = await AppDataSource.transaction( async ( manager ) => {

        const asistenciasExistentes = await manager.find( Asistencia, {
          where: {
            fecha
          },
          relations: {
            alumno: true
          }
        });

      // Primer registro de asistencias de la fecha
      if (asistenciasExistentes.length === 0) {
        const asistenciasEntities: AsistenciaDTO[] = [];

        console.log("No existen asistencias para esa fecha");

        for (const item of alumnos) {
          const alumno = await manager.findOne( Alumno, {
            where: {
              alumnoId: item.alumnoId
            }
          });

          if (!alumno) {
            throw new createError.NotFound(
              `Alumno ${item.alumnoId} no encontrado`
            );
          }

          const asistencia = manager.create(Asistencia, {
            fecha,
            asistio: item.asistio,
            alumno
          });

          asistenciasEntities.push(asistencia);
        }

        return await manager.save(Asistencia, asistenciasEntities);
      }

      // Ya existen asistencias para esa fecha.
      // Solo se actualizan las que hayan cambiado.
      const asistenciasActualizadas: AsistenciaDTO[] = [];

      console.log("Ya existen asistencias para esa fecha");

      for (const item of alumnos) {
        const asistenciaExistente = asistenciasExistentes.find(
          (asistencia) =>
            asistencia.alumno.alumnoId === item.alumnoId
        );

        if (!asistenciaExistente) {
          throw new createError.NotFound(
            `No existe asistencia para el alumno ${item.alumnoId} en la fecha ${fecha}`
          );
        }

        if (asistenciaExistente.asistio !== item.asistio) {
          asistenciaExistente.asistio = item.asistio;

          asistenciasActualizadas.push(asistenciaExistente);
        }
      }

      if (asistenciasActualizadas.length > 0) {
        await manager.save(Asistencia, asistenciasActualizadas);
      }

      return asistenciasActualizadas;
    });

    return response.success(
      res,
      200,
      'Asistencias guardadas',
      resultado
    );

  } catch (error) {
    logger.error(error);
    response.error(res, error);
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