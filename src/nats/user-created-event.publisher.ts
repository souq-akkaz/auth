import { inject, injectable } from 'inversify';

import { TYPES } from '../di/injection-tokens';
import { SubjectsEnum } from '../core/models';
import { Publisher } from './publisher';
import { Stan } from 'node-nats-streaming';

interface ICreatedUserEvent {
  data: {
    userId: number;
    username: string;
    email: string;
  };
  subject: SubjectsEnum.USER_CREATED;
}

@injectable()
export class UserCreatedEventPublisher extends Publisher<ICreatedUserEvent> {
  subject = SubjectsEnum.USER_CREATED;
  constructor(@inject(TYPES.StanClient) private stan: Stan) {
    super(stan);
  }
}