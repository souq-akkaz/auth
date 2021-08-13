import { plainToClass } from 'class-transformer';
import _ from 'lodash';

import { ParamterError } from '../../core/exceptions';
import { User } from '../../core/models';

interface IBuildSignUpResponseDto {
  token: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'username'>
}

export class SignUpResponseDto {
  token: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'username'>

  static toDto(data: IBuildSignUpResponseDto): SignUpResponseDto {
    if (_.isNil(data.token) || _.isNil(data.refreshToken) || _.isNil(data.user)) {
      throw new ParamterError(
        'To build sign up response dto instance you have to provide `token`, `refreshToken`, and `user`.',
        ['token', 'refreshToken', 'user'],
        'BLDSIUPFLDz-1'
      );
    }
    return plainToClass(SignUpResponseDto, data);
  }
}
