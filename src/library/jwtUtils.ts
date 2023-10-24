import * as jwt from 'jsonwebtoken';
import { User } from '../entity/Users';

const secretKey = process.env.JWT_SECRET;

export class JwtUtils {
  /**
   *Generates jwt token, using 'jwt.sign' function. Static to allow to be called inside class itself.
   * @param data instance of user to which the token will be assigned.
   * @param expiresIn Time taken until token expires.
   * @returns {Promise<string>} JWT token (string), returned from asynchronously from jwt api.
   */
  public static generateJWTToken(
    data: object,
    expiresIn: string
  ): Promise<string> {
    return jwt.sign(data, secretKey, { expiresIn });
  }

  /**
   *Adds passwordRecoveryToken to user instance for 30 minutes.
   * @param user instance of a User.
   * @param userId number representing the user's id.
   * @returns {Promise<string>} Updates the user's token only, without interferring
   * with the other attributes of the user.
   */
  public static async addPasswordRecoveryToken(
    user: User,
    userId: number
  ): Promise<string> {
    const token = await this.generateJWTToken({ userId: userId }, '24h');

    user.passwordRecoveryToken = token;

    return token;
  }
}
