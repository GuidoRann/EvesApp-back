import { Router } from "express";
import { FamiliarService } from "../services/FamiliarService";

const router: Router = Router();

router
  .get( "/:id", FamiliarService.obtenerFamiliar )
  .get( "/buscarPorDni/:numeroDocumento", FamiliarService.obtenerFamiliarPorDNI )
  .post( "/crearFamiliar", FamiliarService.crearFamiliar )
  .post( "/agregarFamiliar", FamiliarService.agregarFamiliar )
  .post( "/:id", FamiliarService.actualizarFamiliar )
  .delete( "/:id", FamiliarService.eliminarFamiliar );

export const familiarController: Router = router;
