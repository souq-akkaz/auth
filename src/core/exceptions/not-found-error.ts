import { HttpStatusCode } from './http-status-code.enum';

export class NotFoundError {
  statusCode = HttpStatusCode.NOT_FOUND;
  constructor(public message: string, public id: string, public code?: string) {}
}
