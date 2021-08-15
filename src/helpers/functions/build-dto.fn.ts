import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import _ from 'lodash';
import R from 'ramda';
import { ParamterError } from '../../core/exceptions';

const buildDto = async <T>(klass: ClassConstructor<T>, data: any): Promise<T> => {
  try {
    const dto = plainToClass(klass, data);
    await validateOrReject(dto as Object);
    return dto;
  } catch (exc) {
    if (exc instanceof Array && !_.isEmpty(exc) && exc[0] instanceof ValidationError) {
      const validationErrors = exc as Array<ValidationError>;
      const messages = _.flatten(
        validationErrors.map((x) => _.values(x.constraints))
      );
      throw new ParamterError(
        messages,
        exc.map(R.prop('property')),
        'errors.buildDto.failedToBuildDto'
      )
    }
    throw exc;
  }
};

export default buildDto;
