import { Router } from "express";
import { EscuelaService } from "../services/EscuelaService";

const router = Router();

router
  .get( "/listarEscuelas", EscuelaService.obtenerListaDeEscuelas )
  .get( "/:id", EscuelaService.obtenerEscuela )
  .post( "/crearEscuela", EscuelaService.crearEscuela )
  .put( "/unirmeEscuela/:id", EscuelaService.unirmeAUnaEscuela )
  .put( "/:id", EscuelaService.actualizarEscuela )
  .delete( "/:id", EscuelaService.eliminarEscuela );

export const escuelaController: Router = router;
