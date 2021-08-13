import { ParamterError } from './parameter-error';

const errorGlobalHandler = (error: any) => {
  if (error instanceof ParamterError) {
    return {
      statusCode: error.statusCode,
      message: error.messages,
      code: error.code,
      params: error.params
    };
  }
};

export default errorGlobalHandler;
