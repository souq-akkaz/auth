import { injectable } from 'inversify';
import { Stan } from 'node-nats-streaming';

import { SubjectsEnum } from '../core/models';

interface IEvent {
  data: any;
  subject: SubjectsEnum;
}

@injectable()
export abstract class Publisher<T extends IEvent> {
  abstract subject: T['subject'];
  private _client: Stan;

  constructor(client: Stan) {
    this._client = client;
  }

  publish(data: T['data']): void {
    this._client.publish(this.subject, JSON.stringify(data), () => {
      console.log(`published event ${this.subject} successfully`);
    });
  }
}