import { HttpStatusCode } from './http-status-code.enum';

export class UnAuthorizedError {
  statusCode = HttpStatusCode.UNAUTHORIZED;
  constructor(public message: string, public id: string, public code?: string) {}
}