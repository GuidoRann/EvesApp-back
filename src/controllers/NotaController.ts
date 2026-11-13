import { Router } from "express";
import { NotaService } from "../services/NotaService";

const router: Router = Router();

router
  .get( "/:alumnoId", NotaService.obtenerNotaPorAlumno )
  .post( "/crearNota", NotaService.crearNota )
  .post( "/crearListadoNotas", NotaService.crearListadoNotas )
  .put( "/:id", NotaService.actualizarNota )
  .delete( "/:id", NotaService.eliminarNota );

export const notaController: Router = router;
