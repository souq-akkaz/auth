import { Model, Sequelize, DataTypes } from 'sequelize';

import smallarize from '../../../helpers/functions/smallarize.fn';
import config from '../../../config/config';
import { IBuildUser, User } from '../../../core/models';

export class UserRepo extends Model<User, IBuildUser> {
  toModel(): User {
    return User.build({
      email: this.getDataValue('email') as string,
      password: this.getDataValue('password') as string,
      username: this.getDataValue('username') as string,
      id: this.getDataValue('id') as number
    });
  }
}

export default (sequelize: Sequelize) => {
  return UserRepo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: User.tableName,
    schema: config.db.schema,
    modelName: smallarize(User.name),
    timestamps: false
  });
};
