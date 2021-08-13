import { Router } from 'express';

import handleRoute from '../helpers/functions/handle-route.fn';
import { AuthController } from '../auth/controllers/auth.controller';
import diContainer from '../di/di-container';
import buildDtoMiddleware from '../middlewares/build-dto.middleware';
import { SignUpRequestDto } from '../auth/dtos/sign-up.request.dto';

const authRouter = Router();
const authController = diContainer.resolve(AuthController);

authRouter.post(
  '/signup',
  buildDtoMiddleware(SignUpRequestDto),
  handleRoute(authController.singup)
);
authRouter.post('/login', handleRoute(authController.login));

export default authRouter;
