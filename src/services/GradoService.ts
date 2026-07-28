import { type Request, type Response } from 'express';
import createError from 'http-errors';
import { GradoRepository } from '../repositories/GradoRepository';
import { logger } from '../common/logger';
import { response } from '../common/Response';
import { MaestraRepository } from '../repositories/MaestraRepository';

interface Params {
  id: string;
}

export const GradoService = {
  crearGrado: async ( req: Request, res: Response ) => {
    try {
      if( !req.user?.id ) return res.status( 401 ).json({ message: 'Unauthorized' });

      const maestra = await MaestraRepository.findOne({
        where: {
          supabaseUserId: req.user.id,
        },
      });

      if (!maestra) {
        return res.status(404).json({ message: "Maestra no encontrada" });
      }
      
      const nuevoGrado = GradoRepository.create({
        numero: req.body.numero,
        letra: req.body.letra,
        turno: req.body.turno,
        divisionAnual: req.body.divisionAnual,

        escuela: {
          escuelaId: req.body.escuelaId
        },

        maestraTitular: {
          maestraId: maestra.maestraId
        }
      });

      const grado = await GradoRepository.save(nuevoGrado);

      return response.success( res, 201, 'Grado creado', grado );
    } catch ( error ) {
      logger.error( error );
      response.error( res, error );       
    }
  },

  obtenerGrado: async ( req: Request< Params >, res: Response ) => {
    try {
      const { id } = req.params;
      const gradoObtenido = await GradoRepository.findOne( { 
        where: {
          gradoId: id
        },
        relations: {
          maestraTitular: true,
          maestras: true,
          escuela: true,
          listaAlumnos: true
        }
      } );

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