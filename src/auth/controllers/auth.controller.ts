import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../di/injection-tokens';
import { SignUpResponseDto } from '../dtos';
import { SignUpRequestDto } from '../dtos/sign-up.request.dto';
import { AuthService } from '../services/auth.service';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private _authService: AuthService
  ) {}
  singup = async (req: Request, res: Response) => {
    const signupDto = req.body as SignUpRequestDto;

    const createdUser = await this._authService.createUser(signupDto);
    const token = this._authService.createToken({ userId: createdUser.id });
    res.json(
      SignUpResponseDto.toDto({
        user: { id: createdUser.id, username: createdUser.username },
        token,
        refreshToken: this._authService.createRefreshToken({ userId: createdUser.id })
      })
    );
  }

  login = (req: Request, res: Response) => {
    res.json({ login: true });
  }
}
