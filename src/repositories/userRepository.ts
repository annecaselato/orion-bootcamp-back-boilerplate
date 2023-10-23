import { MysqlDataSource } from '../config/database';
import { Users } from '../entity/Users';

export const userRepository = MysqlDataSource.getRepository(Users);
