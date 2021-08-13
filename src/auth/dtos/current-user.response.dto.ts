import { plainToClass } from 'class-transformer';

import { TypoError } from '../../core/exceptions';
import ifNil from '../../helpers/functions/if-nil.fn';

interface IBuildCurrentUserResponseDto {
  id: number;
  username: string;
  email: string;
}

export class CurrentUserResponseDto {
  id: number;
  username: string;
  email: string;

  static toDto(data: IBuildCurrentUserResponseDto): CurrentUserResponseDto {
    ifNil(data.id)
      .throwError(
        new TypoError(
          'to build `CurrentUserResponseDto` instance you must provide user `id` property',
          'currentUserResponse.toDto.idPropIsMissing'
        )
      );

    ifNil(data.email)
      .throwError(
        new TypoError(
          'to build `CurrentUserResponseDto` instance you must provide user `email` property',
          'currentUserResponse.toDto.emailPropIsMissing'
        )
      );

    ifNil(data.username)
      .throwError(
        new TypoError(
          'to build `CurrentUserResponseDto` instance you must provide user `username` property',
          'currentUserResponse.toDto.usernamePropIsMissing'
        )
      );

    return plainToClass(CurrentUserResponseDto, data);
  }
}
