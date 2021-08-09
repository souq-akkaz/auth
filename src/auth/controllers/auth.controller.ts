import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

class AuthController {
  private _authService = new AuthService();
  singup = async (req: Request, res: Response) => {
    const signupDto = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    const createdUser = await this._authService.createUser(signupDto);
    const token = this._authService.createToken({ userId: createdUser.id });
    res.json({
      user: { id: createdUser.id, username: createdUser.username },
      token
    });
  }

  login = (req: Request, res: Response) => {
    res.json({ login: true });
  }
}

export default new AuthController();
