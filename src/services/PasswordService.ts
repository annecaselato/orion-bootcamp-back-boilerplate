import { hash } from 'bcrypt';
import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';

export class PasswordService {
  private passwordService: Repository<User>;

  constructor() {
    this.passwordService = MysqlDataSource.getRepository(User);
  }

  async authenticate(id: number, password: string): Promise<string> {
    const user = await this.passwordService.findOne({ where: { id } });
    if (!user) {
      return undefined;
    }

    if (user) {
      const randomSalt = randomInt(10, 16);
      const passwordHash = await hash(password, randomSalt);
      user.password = passwordHash;
      this.passwordService.save(user);
    }
  }
}
