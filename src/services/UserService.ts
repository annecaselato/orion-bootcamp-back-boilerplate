import { User } from '../database/entity/User';
import { MysqlDataSource } from '../config/database';

export class UserAutenticator {
  private userRepository = MysqlDataSource.getRepository(User);

  async userLogin(email: string, userpassword: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && user.password === userpassword) {
      return user;
    }
    return null;
  }
}
