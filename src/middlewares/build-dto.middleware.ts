import { ClassConstructor } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import errorGlobalHandler from '../core/exceptions/error-global-handler';
import buildDto from '../helpers/functions/build-dto.fn';

const buildDtoMiddleware = <T>(klass: ClassConstructor<T>) => async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && !_.isEmpty(req.body)) {
      req.body = await buildDto(klass, req.body);
    }
    next();
  } catch (exc) {
    const error = errorGlobalHandler(exc);
    res.status(error.statusCode).send(error);
  }
};

export default buildDtoMiddleware;
