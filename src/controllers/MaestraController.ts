import { Router } from "express";
import { MaestraService } from "../services/MaestraService";

const router: Router = Router();

router
  .get( "/me", MaestraService.obtenerPerfil )
  .get( "/listarMaestras", MaestraService.obtenerListaDeMaestras )
  .get( "/:id", MaestraService.obtenerMaestra )
  .put( "/:id", MaestraService.actualizarMaestra )
  .delete( "/:id", MaestraService.eliminarMaestra );

export const maestraController: Router = router;