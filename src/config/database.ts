import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  name: 'orion',
  type: 'mysql',
  database: process.env.DB_DATABASE,
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/entity/*.ts', 'entity/*.js'],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  logging: true,
  synchronize: true
});
