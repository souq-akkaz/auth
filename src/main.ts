import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/config';
import database from './persistence/database/database';
import setupAuthRoutes from './routers';
import { UserRepo } from './persistence/database/repositories/user.repository';
import errorGlobalHandler from './core/exceptions/error-global-handler';

dotenv.config({ path: process.env.NODE_ENV == 'production' ? '.env' : 'dev.env' });

const establishDatabaseConnection = async () => {
  await database.connect({
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: +process.env.MYSQL_PORT
  })
  .authenticate();
  await database.sequelize.sync({ alter: true });
};

const bootstrap = async () => {
  const app = express();

  app.use(cors());
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.use(compression());

  await establishDatabaseConnection();

  setupAuthRoutes(app);
  app.use(errorGlobalHandler);

  app.listen(
    config.port,
    () => console.log(`app listening on port ${config.port}`)
  );
};

bootstrap();
