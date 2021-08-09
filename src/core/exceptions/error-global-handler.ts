import { Request, Response, NextFunction } from 'express';

import { ParamterError } from './parameter-error';

const errorGlobalHandler = (error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ParamterError) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      code: error.code,
      params: error.params
    });
  }
};

export default errorGlobalHandler;
