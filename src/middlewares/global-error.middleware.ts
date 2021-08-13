import { Request, Response, NextFunction } from 'express';

import errorGlobalHandler from '../core/exceptions/error-global-handler';

const errorGlobalHandlerMiddleware = (error, req: Request, res: Response, next: NextFunction) => {
  const jsonError = errorGlobalHandler(error);
  res.status(jsonError.statusCode).send(jsonError);
};

export default errorGlobalHandlerMiddleware;
