import { Request, Response, NextFunction } from 'express';
import createError, { Unauthorized } from 'http-errors';
import { supabase } from '../config/supabase';

export const verifySupabaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const authHeader = req.headers.authorization;

    if ( !authHeader ) {
      throw new createError.Unauthorized( 'Token no proporcionado' );
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Unauthorized("Formato inválido");
    }

    const token = authHeader.replace( 'Bearer ', '' );

    const { data, error } = await supabase.auth.getUser( token );

    if ( error || !data.user ) {
      throw new createError.Unauthorized( 'Token inválido' );
    }

    req.user = data.user;

    next();

  } catch ( error ) {
    next( error );
  }
};