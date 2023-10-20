import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  database: process.env.DB_DATABASE,
  url: process.env.DB_CONNECTION_STRING,
  entities: ['src/database/entity/*.ts', 'src/database/entity/*.js'],
  migrations: ['src/database/migrations/*.ts', 'src/database/migrations/*.js'],
  migrationsRun: true,
  logging: true,
  synchronize: true
});
