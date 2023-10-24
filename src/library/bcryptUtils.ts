import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/Users';

const secretKey = process.env.JWT_SECRET;

class BcryptUtils {
  static generateJWTToken(data: object, expiresIn: string): Promise<string> {
    return jwt.sign(data, secretKey, { expiresIn });
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  static async addPasswordRecoveryToken(
    user: User,
    userId: number
  ): Promise<string> {
    const token = await this.generateJWTToken({ userId: userId }, '30m');

    user.passwordRecoveryToken = token;

    return token;
  }
}

export default BcryptUtils;
