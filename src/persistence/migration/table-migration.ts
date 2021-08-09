import { Sequelize } from 'sequelize';

export abstract class TableMigration {
  abstract tableName: string;
  abstract schema: string;
  abstract createTable(): Promise<void>;

  get tableNameWithSchema(): string {
    return `${this.schema}.${this.tableName}`;
  }
  constructor(protected sequelize: Sequelize) {}
}