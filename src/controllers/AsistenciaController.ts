import { Router } from "express";
import { AsistenciaService } from "../services/AsistenciaService";

const router: Router = Router();

router
  .get( "/:id", AsistenciaService.obtenerAsistencia )
  .post( "/crear", AsistenciaService.crearAsistencia )
  .put( "/:id", AsistenciaService.actualizarAsistencia )
  .delete( "/:id", AsistenciaService.eliminarAsistencia );

export const asistenciaController: Router = router;
