import { Router } from "express";
import { NotaService } from "../services/NotaService";

const router: Router = Router();

router
  .get( "/:id", NotaService.obtenerNota )
  .post( "/crear", NotaService.crearNota )
  .put( "/:id", NotaService.actualizarNota )
  .delete( "/:id", NotaService.eliminarNota );

export const notaController: Router = router;
