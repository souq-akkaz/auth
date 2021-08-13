import { ClassConstructor } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import buildDto from '../helpers/functions/build-dto.fn';
import errorGlobalHandlerMiddleware from './global-error.middleware';

const buildDtoMiddleware = <T>(klass: ClassConstructor<T>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      req.body = await buildDto(klass, req.body);
    }
    next();
  } catch (exc) {
    errorGlobalHandlerMiddleware(exc, req, res, next);
  }
};

export default buildDtoMiddleware;
