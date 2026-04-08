import { Router } from "express";
import { EscuelaService } from "../services/EscuelaService";

const router = Router();

router
  .get( "/listado", EscuelaService.obtenerListaDeEscuelas )
  .get( "/:id", EscuelaService.obtenerEscuela )
  .post( "/crear", EscuelaService.crearEscuela )
  .put( "/:id", EscuelaService.actualizarEscuela )
  .delete( "/:id", EscuelaService.eliminarEscuela );

export const escuelaController: Router = router;
