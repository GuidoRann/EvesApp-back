import { Router } from "express";
import { AlumnoService } from "../services/AlumnoService";

const router: Router = Router();

router
  .get( "/listado", AlumnoService.obtenerListaDeAlumnos )
  .get( "/:id", AlumnoService.obtenerAlumno )
  .post( "/crear", AlumnoService.crearAlumno )
  .put( "/:id", AlumnoService.actualizarAlumno )
  .delete( "/:id", AlumnoService.eliminarAlumno );

export const alumnoController: Router = router;
