import { MysqlDataSource } from '../config/database';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/User';

export class Repository {
  private repository = MysqlDataSource.getRepository(User);

  constructor() {}

  private salt = () => 10;

  async createAndSave(userData) {
    const { firstName, lastName, gender, birthDate, email, password } =
      userData;

    const salt = this.salt();
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser: User = new User();
    (newUser.firstName = firstName),
      (newUser.lastName = lastName),
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
