import { HttpStatusCode } from "./http-status-code.enum";

export class TypoError {
  statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  constructor(public message: string, public id: string, public code?: string) {}
}
