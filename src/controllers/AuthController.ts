import { Router } from 'express';
import { AuthService } from '../services/AuthService';
import { verifySupabaseToken } from '../middlewares/auth.middleware';

const router: Router = Router();

router
  .post('/google', verifySupabaseToken, AuthService.obtenerOCrearMaestra);

export const authController: Router = router;
