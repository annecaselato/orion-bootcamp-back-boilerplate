import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';
import { NodemailerProvider } from '../utils/nodeMailer';

export class EmailService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = MysqlDataSource.getRepository(User);
  }
  async emailWelcome(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return undefined;
    }

    await new NodemailerProvider().sendEmailWelcome(
      'lorenaborgessilva@gmail.com',
      user.firstName
    );
  }
}
