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
      const token = await jwtRecoverPassword.createToken(
        'jgabriellyra@hotmail.com'
      );
      await outlookTransporter.sendEmail(token, 'jgabriellyra@hotmail.com');
    }
  }
}
