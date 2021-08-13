import { injectable } from 'inversify';
import { WhereOptions, Op } from 'sequelize';
import jwt from 'jsonwebtoken';

import { UserRepo } from '../../persistence/database/repositories/user.repository';
import { IBuildUser, User } from '../../core/models';
import notNil from '../../helpers/functions/not-nil.fn';
import { ParamterError } from '../../core/exceptions';

interface ICreateToken {
  userId: number;
}

@injectable()
export class AuthService {
  createUser = async (data: IBuildUser): Promise<User> => {
    const where: WhereOptions<User> = {
      [Op.or]: [
        { username: data.username },
        { email: data.email }
      ]
    };
    const existingUser = await UserRepo.findOne({ where });
    if (notNil(existingUser)) {
      throw new ParamterError('User already exists', 'email', 'UQWXSS01');
    }

    const createdUser = await UserRepo.create(data);

    return createdUser.toModel();
  };

  createToken = (data: ICreateToken): string => {
    const token = jwt.sign({ currentUserId: data.userId }, process.env.JWT_SECRET, {
      expiresIn: '10m'
    });
    return token;
  }

  createRefreshToken = (data: ICreateToken): string => {
    return jwt.sign({ currentUserId: data.userId }, process.env.JWT_SECRET, { expiresIn: '15m' })
  };
}
