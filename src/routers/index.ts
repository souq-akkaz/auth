import { Express } from 'express';

import { apiV1 } from '../helpers/functions';
import authRouter from './auth.router';

const setupAuthRoutes = (app: Express): void => {
  apiV1(app, authRouter, 'auth');
};

export default setupAuthRoutes;
