import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { logger } from '../common/logger';
import { NotaRepository } from '../repositories/NotaRepository';
import { response } from '../common/Response';
import { CreateListadoNotasDTO, CreateNotaDTO } from '../types/types';
import { NotaMapper } from '../mappers/NotaMapper';
import { AlumnoRepository } from '../repositories/AlumnoRepository';
import { In } from 'typeorm';
import { AppDataSource } from '../db';
import { Nota } from '../models/Nota';
import { Alumno } from '../models/Alumno';
import { Materia } from '../models/Materia';

interface Params {
  id: string;
}

export const NotaService = {
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

  crearListadoNotas: async (
    req: Request<{}, {}, CreateListadoNotasDTO>,
    res: Response
  ) => {
    try {
      const { notas, plazo } = req.body;

      const resultado = await AppDataSource.transaction( async manager => {

        const notaRepository = manager.getRepository( Nota );
        const alumnoRepository = manager.getRepository( Alumno );
        const materiaRepository = manager.getRepository( Materia );

        const materias = Object.keys( notas );

        // Obtener todas las materias
        const materiasDB = await materiaRepository.find({
          where: {
            nombre: In( materias )
          }
        });

        const materiasMap = new Map(
          materiasDB.map( materia => [ materia.nombre, materia ])
        );

        // Obtener todos los alumnos enviados
        const alumnoIds = [
          ...new Set(
            Object.values(notas).flatMap(alumnos =>
              alumnos.map(alumno => alumno.alumnoId)
            )
          )
        ];

        const alumnosDB = await alumnoRepository.findBy({
          alumnoId: In( alumnoIds )
        });

        const alumnosMap = new Map(
          alumnosDB.map( alumno => [ alumno.alumnoId, alumno ])
        );

        // Obtener las notas existentes del plazo
        const notasExistentes = await notaRepository.find({
          where: { plazo },
          relations: {
            alumno: true,
            materia: true
          }
        });

        // Crear un mapa para encontrar las notas existentes
        const notasMap = new Map(
          notasExistentes.map( nota => [
            `${ nota.alumno.alumnoId }-${ nota.materia.nombre }`,
            nota
          ])
        );

        const notasGuardar: Nota[] = [];
        const notasEliminar: Nota[] = [];

        const pesos: Record<string, number> = {
          NS: 20,
          S: 40,
          B: 60,
          MB: 80,
          E: 100
        };

        // Recorrer materias
        for ( const [ nombreMateria, alumnos ] of Object.entries( notas ) ) {

          const materia = materiasMap.get( nombreMateria );

          if ( !materia ) {
            throw new Error(`No existe la materia: ${ nombreMateria }`);
          }

          // Recorrer alumnos de cada materia
          for ( const alumnoData of alumnos ) {

            const alumno = alumnosMap.get( alumnoData.alumnoId );

            if ( !alumno ) {
              throw new Error(`No existe el alumno: ${ alumnoData.alumnoId }`);
            }

            const key = `${ alumno.alumnoId }-${ materia.nombre }`;
            const notaExistente = notasMap.get( key );

            // Si la nota está vacía
            if ( !alumnoData.nota?.trim() ) {

              if ( notaExistente ) {
                notasEliminar.push( notaExistente );
              }

              continue;
            }

            // Normalizar y validar la nota
            const letra = alumnoData.nota.trim().toUpperCase();
            const peso = pesos[ letra ];

            if ( peso === undefined ) {
              throw new Error(`Nota inválida: ${ alumnoData.nota }`);
            }

            // Si ya existe, comprobar si cambió
            if ( notaExistente ) {

              if (
                notaExistente.letra !== letra ||
                Number( notaExistente.peso ) !== peso
              ) {
                notaExistente.letra = letra;
                notaExistente.peso = peso;

                notasGuardar.push( notaExistente );
              }

            } else {

              // Crear una nota nueva
              const nuevaNota = notaRepository.create({
                plazo,
                letra,
                peso,
                alumno,
                materia
              });

              notasGuardar.push( nuevaNota );
            }
          }
        }

        // Guardar notas nuevas y modificadas
        if ( notasGuardar.length > 0 ) {
          await notaRepository.save( notasGuardar );
        }

        // Eliminar notas que quedaron vacías
        if ( notasEliminar.length > 0 ) {
          await notaRepository.remove( notasEliminar );
        }

        return {
          creadasYActualizadas: notasGuardar.length,
          eliminadas: notasEliminar.length
        };
      });

      return response.success(
        res,
        200,
        'Listado de notas actualizado correctamente',
        resultado
      );

    } catch ( error ) {
      logger.error( error );
      response.error( res, error );
    }
  },

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

  obtenerNotaPorAlumno: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const alumnoNotas = await AlumnoRepository.findOneBy( { alumnoId: id } );

      if(!alumnoNotas) {
        throw new createError.NotFound('Notas no encontradas');
      }

      const notas = alumnoNotas.notas;
      
      return response.success( res, 200, 'Notas obtenidas', notas );
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