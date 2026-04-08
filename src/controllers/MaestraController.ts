import { Router } from "express";
import { MaestraService } from "../services/MaestraService";

const router: Router = Router();

router
  .get( "/perfil", MaestraService.obtenerPerfil )
  .get( "/:id", MaestraService.obtenerMaestra )
  .get( "/listado", MaestraService.obtenerListaDeMaestras )
  .put( "/:id", MaestraService.actualizarMaestra )
  .delete( "/:id", MaestraService.eliminarMaestra );

export const maestraController: Router = router;
