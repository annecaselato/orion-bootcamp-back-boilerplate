import { MysqlDataSource } from '../config/database';
import { User } from '../entity/Users';

export const userRepository = MysqlDataSource.getRepository(User);
