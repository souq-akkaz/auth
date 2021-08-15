import { HttpStatusCode } from './http-status-code.enum';

export class ParamterError {
  statusCode = HttpStatusCode.BAD_REQUEST;
  constructor(
    public messages: string[] | string,
    public params: any[] | string,
    public id: string,
    public code: string = undefined
  ) {}
}
