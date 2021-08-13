import { plainToClass } from 'class-transformer';
import _ from 'lodash';

import { TypoError } from '../../core/exceptions';
import { User } from '../../core/models';

interface IBuildLoginResponseDto {
  token: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'username'>;
}

export class LoginResponseDto {
  token: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'username'>;

  static toDto(data: IBuildLoginResponseDto): LoginResponseDto {
    const { token, refreshToken, user } = data;
    if (_.isNil(token)) {
      throw new TypoError(
        'to build `LoginResponseDto` instance you must provide `token`',
        'buildLoginResponseDto.tokenNotProvided',
        'tkntPP_qqH'
      );
    }
    if (_.isNil(refreshToken)) {
      throw new TypoError(
        'to build `LoginResponseDto` instance you must provide `refreshToken`',
        'buildLoginResponseDto.refreshTokenNotProvided',
        'rftkntPP_qqH'
      );
    }
    if (_.isNil(user) || _.isEmpty(user)) {
      throw new TypoError(
        'to build `LoginResponseDto` instance you must provide `user` object',
        'buildLoginResponseDto.userNotProvidedOrEmpty',
        'usRRPP_qqH'
      );
    }
    return plainToClass(LoginResponseDto, data);
  }
}
