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

  async authenticate(
    email: string,
    password: string,
    checkbox: boolean
  ): Promise<string> {
    const user = await this.userService.findOne({ where: { email: email } });
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

    let expiredToken = '24h';
    if (!checkbox) {
      expiredToken = '1h';
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: expiredToken
    });

    return token;
  }

  async findById(id: number) {
    const userId = await this.userService.findOne({ where: { id: id } });
    if (!userId) {
      return undefined;
    }
    return true;
  }
}
