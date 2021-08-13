import { Container } from 'inversify';

import { AuthService } from '../auth/services/auth.service';
import { TYPES } from './injection-tokens';
import { AuthController } from '../auth/controllers/auth.controller';
import { UserService } from '../auth/services/user.service';

const diContainer = new Container();

diContainer.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
diContainer.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
diContainer.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();

export default diContainer;
