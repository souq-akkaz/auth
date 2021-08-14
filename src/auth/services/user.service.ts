import { injectable } from 'inversify';
import { Op, WhereOptions } from 'sequelize';

import { UserRepo } from '../../persistence/database/repositories';
import { IBuildUser } from '../../core/models';
import { User } from '../../core/models';
import notNil from '../../helpers/functions/not-nil.fn';
import { NotFoundError, ParamterError } from '../../core/exceptions';
import _ from 'lodash';

@injectable()
export class UserService {
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

  getUserById = async (userId: number): Promise<User> => {
    const user = await UserRepo.findByPk(userId);
    if (_.isNil(user)) {
      throw new NotFoundError(
        `User with id ${userId} not found`,
        'authService.getUserById.userNotFound',
        'USRNTFND_4x'
      );
    }
    return user.toModel();
  }

  getUserByUsername = async (username: string): Promise<User> => {
    const user = await UserRepo.findOne({ where: { username } });
    if (_.isNil(user)) {
      throw new NotFoundError(
        `User with username ${username} not found`,
        'authService.getUserByUsername.userNotFound',
        'USRNTFND_usnm4x'
      );
    }
    return user.toModel();
  }
}