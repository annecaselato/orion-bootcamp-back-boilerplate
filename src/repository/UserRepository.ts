import { MysqlDataSource } from '../config/database';
import * as bcrypt from 'bcrypt';
import User from '../entity/User';

export class UserRepository {
  private repository = MysqlDataSource.getRepository(User);
  private salt = (): number => 10;

  async createAndSave(userData): Promise<User> {
    const salt = this.salt();
    const hashpassword = await bcrypt.hash(userData.password, salt);

    const newUser: User = await this.repository.manager.save(User, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      birthDate: userData.birthDate,
      email: userData.email,
      password: hashpassword
    });

    // retorna por busca para que não retorne hash
    return this.findOneByEmail(newUser.email);
  }

  async findOneByEmail(userEmail: string) {
    const user = await this.repository.findOne({
      where: { email: userEmail }
    });
    return user;
  }
}
