import "reflect-metadata"
import 'dotenv/config';
import app from './app';
import { AppDataSource } from './db';

const PORT = 3000;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log( 'Database connected' )

    app.listen( 3000, () => {
      console.log( `Server is running on port ${PORT}`)
    })
  } catch ( error ) {
    console.log( error )
  }
}

main();