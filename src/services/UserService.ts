import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../database/entity/User';
import { NodemailerProvider } from '../utils/NodemailerProvider';
import { resolve } from 'path';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = MysqlDataSource.getRepository(User);
  }

  public async authenticate(
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

  public async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async updatePassword(
    id: number,
    password: string
  ): Promise<void | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return undefined;
    }
    if (user) {
      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;
      this.userRepository.save(user);
    }
  }

  public async recoverPassword(email: string): Promise<string> {
    const user: User = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const token = jwt.sign(
        { id: String(user.id) },
        (process.env.JWT_PASS as Secret) || null,
        {
          expiresIn: '1d',
          algorithm: 'HS256'
        }
      );
      const path = resolve(__dirname, '../templates/emailRecoverPassword.hbs');
      const subject = 'Redefinição de Senha';
      const variables = {
        userName: user.firstName,
        token: token
      };
      await new NodemailerProvider().sendEmail(email, subject, variables, path);
      return token;
    }
  }

  public async emailWelcome(email: string, firstName: string): Promise<void> {
    const path = resolve(__dirname, '../templates/emailWelcome.hbs');
    const subject = 'Bem-vindo à Marte 101';
    const variables = {
      userName: firstName
    };
    await new NodemailerProvider().sendEmail(email, subject, variables, path);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async newUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const newUser = this.userRepository.save({
      firstName,
      lastName,
      email,
      password
    });
    return newUser;
  }
}
