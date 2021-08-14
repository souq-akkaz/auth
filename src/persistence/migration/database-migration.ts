import { Sequelize } from 'sequelize';

import { UserTableMigration } from './user-table.migration';

export class DatabaseMigration {
  constructor(private _sequelize: Sequelize) {}

  async migrate(): Promise<void> {
    await Promise.all([
      new UserTableMigration(this._sequelize).createTable()
    ]);
  }
}
