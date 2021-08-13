import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import { Sequelize } from 'sequelize';

interface ISequelizeConnectionOptions {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

class Database {
  private _connectionOptions: ISequelizeConnectionOptions;
  sequelize: Sequelize;

  connect(options: ISequelizeConnectionOptions): this {
    this._connectionOptions = options;
    this.sequelize = new Sequelize({
      ...this._connectionOptions,
      dialect: 'mysql',
      sync: { alter: true },
      logging: console.log
    });
    return this;
  }

  async authenticate(): Promise<void> {
    this.addModels();
    await this.sequelize.authenticate();
    console.log(`Connected to database successfully.`);
  }

  addModels(): void {
    const dirFiles = readdirSync(join(resolve(__dirname + '/repositories')));
    dirFiles
      .filter((x) => (x.endsWith('.js') || x.endsWith('.ts') && !x.endsWith('.d.ts') && !x.startsWith('index.')))
      .map((x) => resolve(`${__dirname}/repositories/${x}`))
      .map((x) => require(x).default(this.sequelize))
  }
}

export default new Database();