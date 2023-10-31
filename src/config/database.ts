import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  name: 'orion',
  type: 'mysql',
  database: process.env.DB_DATABASE,
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/entity/*.ts', 'entity/*.js'],
  migrations: ['src/migrations/*.ts', 'migrations/*.js'],
  logging: true,
  synchronize: true
});
