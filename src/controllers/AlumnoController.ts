import { Router } from "express";
import { AlumnoService } from "../services/AlumnoService";

const router: Router = Router();

router
  .get( "/:id", AlumnoService.obtenerAlumno )
  .post( "/crearAlumno", AlumnoService.crearAlumno )
  .put( "/:id", AlumnoService.actualizarAlumno )
  .delete( "/:id", AlumnoService.eliminarAlumno );

export const alumnoController: Router = router;
