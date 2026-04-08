import { Router } from "express";
import { GradoService } from "../services/GradoService";

const router: Router = Router();

router
  .get( "/:id", GradoService.obtenerGrado )
  .post( "/crear", GradoService.crearGrado )
  .put( "/:id", GradoService.actualizarGrado )
  .delete( "/:id", GradoService.eliminarGrado );

export const gradoController: Router = router;
