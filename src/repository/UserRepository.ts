import { MysqlDataSource } from '../config/database';
import * as bcrypt from 'bcrypt';
import User from '../entity/User';

export class UserRepository {
  private repository = MysqlDataSource.getRepository(User);
  private salt = (): number => 10;

  async createAndSave(userData): Promise<User> {
    const salt = this.salt();
    const hashpassword = await bcrypt.hash(userData.password, salt);

    const newUser = new User();
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.gender = userData.gender;
    newUser.birthDate = userData.birthDate;
    newUser.email = userData.email;
    newUser.password = hashpassword;
    newUser.lastUpdate = new Date();

    await this.repository.manager.save(newUser);
    return newUser;
  }

  async findOneByEmail(userEmail: string) {
    const user = await this.repository.findOne({
      where: { email: userEmail }
    });
    return user;
  }
}
