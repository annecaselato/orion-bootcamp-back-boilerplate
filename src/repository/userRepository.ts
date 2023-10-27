import { MysqlDataSource } from '../config/database';
import { getRepository } from 'typeorm';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/User';

export class Repository {
  private repository = MysqlDataSource.getRepository(User);

  constructor() {}

  async createAndSave(req: Request) {
    const { name, gender, birth_date, email, password } = req.body;
    console.log(name, gender, birth_date, email, password);

    const salt = 10;
    const hashpassword: string = await bcrypt.hash(
      password,
      salt,
      process.env.KEY_HASH_PASSWORD
    );

    const newUser = new User();
    (newUser.name = name),
      (newUser.gender = gender),
      (newUser.birth_date = birth_date),
      (newUser.email = email),
      (newUser.password = hashpassword),
      (newUser.last_update = new Date());

    await this.repository.manager.save(newUser);
    console.log('User has been saved. User id is', newUser.id); // TIRAR DEPOIS !!!!!!!!!!!!!
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
