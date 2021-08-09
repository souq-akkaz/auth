import { HttpStatusCode } from "./http-status-code.enum";

export class ParamterError {
  statusCode = HttpStatusCode.BAD_REQUEST;
  constructor(public message: string, public params: any[], public code: string) {}
}
