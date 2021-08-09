import { Router } from 'express';

import handleRoute from '../helpers/functions/handle-route.fn';
import authController from '../auth/controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', handleRoute(authController.singup));
authRouter.post('/login', handleRoute(authController.login));

export default authRouter;