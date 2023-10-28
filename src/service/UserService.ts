import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';
import { outlookTransporter } from '../utils/nodeMailer';
import { jwtRecoverPassword } from '../utils/jwtToken';
export class UserService {
  constructor(private dataSource: typeof MysqlDataSource) {}
  async recoverPassword(email: string): Promise<void> {
    const user: User = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (user) {
      const token = await jwtRecoverPassword.createToken(user.id);
      await outlookTransporter.sendEmail(token, user.email, user.name);
    }
  }
}
