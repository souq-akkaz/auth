import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import _ from 'lodash';

import { User } from '../../core/models';
import { HttpStatusCode, UnAuthorizedError } from '../../core/exceptions';
import { TYPES } from '../../di/injection-tokens';
import { LoginRequestDto, LoginResponseDto, SignUpResponseDto } from '../dtos';
import { SignUpRequestDto } from '../dtos/sign-up.request.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private _authService: AuthService,
    @inject(TYPES.UserService)
    private _userService: UserService
  ) { }
  singup = async (req: Request, res: Response) => {
    const signupDto = req.body as SignUpRequestDto;

    const createdUser = await this._userService.createUser(signupDto);
    const token = this._authService.createToken({ userId: createdUser.id });
    const refreshToken = this._authService.createRefreshToken({ userId: createdUser.id });

    res
      .status(HttpStatusCode.CREATED)
      .json(
        SignUpResponseDto.toDto({
          user: { id: createdUser.id, username: createdUser.username },
          token,
          refreshToken
        })
      );
  }

  login = async (req: Request, res: Response) => {
    const loginDto = req.body as LoginRequestDto;
    const user: User | null = await this._userService
      .getUserByUsername(loginDto.username)
      .catch(() => null);
    const invalidUsernameOrPasswordError = new UnAuthorizedError(
      'Invalid username or password',
      'login.invalidUsernameOrPassword',
      'lgfld_UZD'
    );

    if (_.isNil(user)) {
      throw invalidUsernameOrPasswordError;
    }

    const passwordIsOk = this._authService.verifyPassword(loginDto.password, user.password);
    if (!passwordIsOk) {
      throw invalidUsernameOrPasswordError;
    }

    res.json(
      LoginResponseDto.toDto({
        refreshToken: this._authService.createRefreshToken({ userId: user.id }),
        token: this._authService.createToken({ userId: user.id }),
        user: { id: user.id, username: user.username }
      })
    );
  }
}
