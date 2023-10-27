import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';

export class UserService {
  private userService: Repository<User>;

  constructor() {
    this.userService = MysqlDataSource.getRepository(User);
  }

  async authenticate(email: string, password: string) {
    const user = await this.userService.findOne({ where: { email: email } });
    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return null;
    }

    const secretKey: string | undefined = process.env.JWT_PASS;
    if (!secretKey) {
      throw new Error('There is no token key');
    }
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: '1h'
    });

    return { token };
  }
}
