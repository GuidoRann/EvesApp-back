import { Router } from "express";
import { AlumnoFamiliarService } from "../services/AlumnoFamiliarService";

const router: Router = Router();

router
  .get( "/crear", AlumnoFamiliarService.crearAlumnoFamiliar )
  .get( "/:id", AlumnoFamiliarService.obtenerAlumnoFamiliar )
  .post( "/:id", AlumnoFamiliarService.actualizarAlumnoFamiliar )
  .delete( "/:id", AlumnoFamiliarService.eliminarAlumnoFamiliar )
  .get( "/listarFamiliares/:alumnoId", AlumnoFamiliarService.obtenerFamiliaresPorAlumno );

export const alumnoFamiliarController: Router = router;
