import { MysqlDataSource } from '../config/database';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/User';

export class Repository {
  private repository = MysqlDataSource.getRepository(User);

  constructor() {}

  async createAndSave(req: Request) {
    const { name, gender, birthDate, email, password } = req.body;

    const salt = 10;
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser: User = new User();
    (newUser.name = name),
      (newUser.gender = gender),
      (newUser.birthDate = birthDate),
      (newUser.email = email),
      (newUser.password = hashpassword),
      (newUser.lastUpdate = new Date());

    await this.repository.manager.save(newUser);
    return newUser;
  }

  async findOneByEmail(userEmail: string) {
    const user = await this.repository.findOne({
      where: {
        email: userEmail
      }
    });
    return user;
  }
}
