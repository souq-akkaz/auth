import { NextFunction, Request, Response } from 'express';

const handleRoute = (fn: (req: Request, res: Response, next: NextFunction) => void) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (exc) {
    next(exc);
  }
};

export default handleRoute;
