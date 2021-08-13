import { injectable } from 'inversify';
import { WhereOptions, Op } from 'sequelize';
import jwt from 'jsonwebtoken';

import { UserRepo } from '../../persistence/database/repositories/user.repository';
import { IBuildUser, User } from '../../core/models';
import notNil from '../../helpers/functions/not-nil.fn';
import { NotFoundError, ParamterError } from '../../core/exceptions';
import _ from 'lodash';
import { compareSync } from 'bcrypt';

interface ICreateToken {
  userId: number;
}

interface IVerifyToken {
  currentUserId: number;
  iat: number;
  exp: number;
}

@injectable()
export class AuthService {


  createToken = (data: ICreateToken): string => {
    const token = jwt.sign({ currentUserId: data.userId }, process.env.JWT_SECRET, {
      expiresIn: '10m'
    });
    return token;
  }

  createRefreshToken = (data: ICreateToken): string => {
    return jwt.sign({ currentUserId: data.userId }, process.env.JWT_SECRET, { expiresIn: '15m' })
  };

  verifyPassword(plaingPassword: string, hashedPassword: string): boolean {
    return compareSync(plaingPassword, hashedPassword);
  }

  verifyToken(token: string): IVerifyToken {
    return jwt.verify(token, process.env.JWT_SECRET) as IVerifyToken;
  }
}
