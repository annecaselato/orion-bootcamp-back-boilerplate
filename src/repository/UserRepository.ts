import { MysqlDataSource } from '../config/database';
import * as bcrypt from 'bcrypt';
import User from '../entity/User';

export class UserRepository {
  private repository = MysqlDataSource.getRepository(User);
  private _saltRounds = (): number => 10;

  async createAndSave(userData): Promise<User> {
    const hashpassword = await bcrypt.hash(
      userData.password,
      this._saltRounds()
    );

    const newUser: User = await this.repository.manager.save(User, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      birthDate: userData.birthDate,
      email: userData.email,
      password: hashpassword
    });

    return this._userCopyWithoutHashPassword(newUser);
  }

  private _userCopyWithoutHashPassword(newUser: User) {
    const userCopy = { ...newUser };
    delete userCopy.password;
    return userCopy;
  }

  async findOneByEmail(userEmail: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email: userEmail }
    });
    return user;
  }
}
