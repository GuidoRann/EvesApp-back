import { type Response } from "express"
import createError from "http-errors";

export const response = {
  success: ( res: Response, status = 200, message = "OK", body = {} ) => {
    res.status( status ).json({ message, body });
  },
  error: ( res: Response, error?: unknown ) => {
    if (error instanceof createError.HttpError) {
      const { statusCode, message } = error;
      res.status(statusCode).json({ message });
    } else {
      const internalError = new createError.InternalServerError();
      res.status(internalError.statusCode).json({ message: internalError.message });
    }
  }
};