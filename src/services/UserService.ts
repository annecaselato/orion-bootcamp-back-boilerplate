import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';
import { outlookTransporter } from '../utils/nodeMailer';
import { jwtRecoverPassword } from '../utils/jwtToken';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = MysqlDataSource.getRepository(User);
  }

  async authenticate(
    email: string,
    password: string,
    rebemberMe: boolean
  ): Promise<string | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return undefined;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return undefined;
    }

    const secretKey: string | undefined = process.env.JWT_PASS;
    if (!secretKey) {
      throw new Error('There is no token key');
    }
    const expirationToken = rebemberMe ? '24h' : '1h';

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: expirationToken
    });

    return token;
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async recoverPassword(email: string): Promise<void> {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (user) {
      const token = await jwtRecoverPassword.createToken(String(user.id));
      await outlookTransporter.sendEmail(token, user.email, user.fullName);
    }
  }
}
