import { Router, Express } from 'express';

export const apiVersion = (version: string) => {
  return (app: Express, router: Router, prefix = '') => {
    app.use(`/api/${version}${prefix ? `/${prefix}` : ''}`, router);
  }
};
