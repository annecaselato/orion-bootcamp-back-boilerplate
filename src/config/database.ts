import { DataSource } from 'typeorm';
import 'dotenv/config';

export const MysqlDataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  database: process.env.DB_DATABASE,
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/database/entity/*.ts', 'database/entity/*.js'],
  migrations: ['src/database/migrations/*.ts', 'database/migrations/*.js'],
  logging: true,
  synchronize: true
});
