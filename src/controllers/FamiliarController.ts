import { Router } from "express";
import { FamiliarService } from "../services/FamiliarService";

const router: Router = Router();

router
  .get( "/crear", FamiliarService.crearFamiliar )
  .get( "/:id", FamiliarService.obtenerFamiliar )
  .post( "/:id", FamiliarService.actualizarFamiliar )
  .delete( "/:id", FamiliarService.eliminarFamiliar );

export const familiarController: Router = router;
