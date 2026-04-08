import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { response } from '../common/Response';
import { MateriaRepository } from '../repositories/MateriaRepository';
import { CreateMateriaDTO, UpdateMateriaDTO } from '../types/types';
import { MateriaMapper } from '../mappers/MateriaMapper';

interface Params {
  id: string;
}

export const MateriaService = {
  obtenerMateria: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const materiaResponse = await MateriaRepository.findOneBy( { materiaId: id } );

      if (!materiaResponse) {
        throw new createError.NotFound('Materia no encontrada');
      };

      return response.success( res, 200, 'Materia obtenida', materiaResponse );
    } catch (error) {
      console.error( error );
      response.error( res, error );      
    }
  },

  obtenerListaDeMaterias: async ( req: Request, res: Response ) => {
    try {
      const materias = await MateriaRepository.find();
    
      return response.success( res, 200, 'Materias obtenidas', materias );
    } catch ( error ) {
      console.error( error );
      response.error( res, error );      
    }
  },

  crearMateria: async ( req: Request< {}, {}, { materia: CreateMateriaDTO } >, res: Response ) => {
    try {
      const { materia } = req.body;
    
      const materiaEntidad = MateriaMapper.toEntity( materia );
    
      const materiaCreada = await MateriaRepository.save( materiaEntidad );
      return response.success( res, 201, 'Materia creada', materiaCreada );
    } catch ( error ) {
      console.error( error );
      response.error( res, error );      
    }
  },

  actualizarMateria: async ( req: Request< Params, {}, { materia: UpdateMateriaDTO } >, res: Response ) => {
    try {
      const { id } = req.params;
      const { materia } = req.body;
    
      const materiaActualizada = await MateriaRepository.update( id, materia );
    
      return response.success( res, 200, 'Materia actualizada', materiaActualizada );
    } catch ( error ) {
      console.error( error );
      response.error( res, error );      
    }
  },

  eliminarMateria: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
    
      const materiaEliminada = await MateriaRepository.delete( id );
    
      return response.success( res, 200, 'Materia eliminada', materiaEliminada );
    } catch ( error ) {
      console.error( error );
      response.error( res, error );      
    }
  }
};