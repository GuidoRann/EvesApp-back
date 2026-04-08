import "reflect-metadata"
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { notaController } from './controllers/NotaController';
import { alumnoController } from './controllers/AlumnoController';
import { alumnoFamiliarController } from './controllers/AlumnoFamiliarController';
import { asistenciaController } from './controllers/AsistenciaController';
import { maestraController } from './controllers/MaestraController';
import { gradoController } from './controllers/GradoController';
import { escuelaController } from './controllers/EscuelaController';
import { familiarController } from './controllers/FamiliarController';
import { materiaController } from './controllers/MateriaController';
import { verifySupabaseToken } from './middlewares/auth.middleware';
import { authController } from './controllers/AuthController';

const app: Express = express();

app.use( morgan( 'dev' ) );
app.use( express.json() );
app.use( cors() );

// Autenticacion de usuarios
app.use( '/auth', authController );

// Middleware de autenticacion
app.use('/api', verifySupabaseToken);

// Endpoints de la app con autorizacion
app.use( '/api/maestra', maestraController );
app.use( '/api/escuela', escuelaController );
app.use( '/api/grado', gradoController );
app.use( '/api/alumno', alumnoController );
app.use( '/api/alumno-familiar', alumnoFamiliarController );
app.use( '/api/familiar', familiarController );
app.use( '/api/asistencia', asistenciaController );
app.use( '/api/materia', materiaController );
app.use( '/api/nota', notaController );

export default app;