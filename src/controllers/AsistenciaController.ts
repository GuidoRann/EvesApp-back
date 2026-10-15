import { Router } from "express";
import { AsistenciaService } from "../services/AsistenciaService";

const router: Router = Router();

router
  .get( "/:id", AsistenciaService.obtenerAsistencia )
  .post( "/crearAsistencias", AsistenciaService.crearAsistencia )
  .get( "/obtenerPorFecha/:fecha", AsistenciaService.obtenerPorFecha )
  .put( "/:id", AsistenciaService.actualizarAsistencia )
  .delete( "/:id", AsistenciaService.eliminarAsistencia );

export const asistenciaController: Router = router;
