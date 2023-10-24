import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/Users';

const secretKey = process.env.JWT_SECRET;

class BcryptUtils {
  /**
   *Generates jwt token, using 'jwt.sign' function. Static to allow to be called inside class itself.
   * @param data instance of user to which the token will be assigned.
   * @param expiresIn Time taken until token expires.
   * @returns {Promise<string>} JWT token (string), returned from asynchronously from jwt api.
   */
  static generateJWTToken(data: object, expiresIn: string): Promise<string> {
    return jwt.sign(data, secretKey, { expiresIn });
  }

  /**
   *Generates encrypted password using 'bcrypt.hash()' function.
   * @param password by user.
   * @returns {Promise<string>} String representing the encrypted version of the password, returned from
   * asynchronous call to bcrypt api.
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   *Compares the actual password with its encrypted version stored in the database.
   * @param plainTextPassword representing actual password by user.
   * @param hashedPassword representing ecrypted password.
   * @returns {Promise<boolean>} True or false regarding correspondence between the 2 passwords.
   */
  static async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  /**
   *Adds passwordRecoveryToken to user instance for 30 minutes.
   * @param user instance of a User.
   * @param userId number representing the user's id.
   * @returns {Promise<string>} Updates the user's token only, without interferring
   * with the other attributes of the user.
   */
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
