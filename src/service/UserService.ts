import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';

export class UserService {
  constructor(private dataSource: typeof MysqlDataSource) {}
  async recoverPassword(email: string): Promise<User> {
    const user: User = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}
