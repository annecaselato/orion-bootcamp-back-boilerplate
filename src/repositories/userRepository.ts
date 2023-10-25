import { UpdateResult } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { JwtUtils } from '../library/jwtUtils';
import { User } from '../entity/Users';

export class UserRepository {
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
  ): Promise<void> {
    const token = await JwtUtils.generateJWTToken({ userId: userId }, '24h');

    user.passwordRecoveryToken = token;
    await MysqlDataSource.getRepository(User).update(user.id, user);
  }

  public static async findUserByEmail(
    email: string
  ): Promise<User | undefinded> {
    return MysqlDataSource.getRepository(User).findOneBy({ email });
  }

  public static async saveAccessTokenInUser(
    userId: number,
    token: string
  ): Promise<UpdateResult> {
    return MysqlDataSource.getRepository(User).update(userId, {
      accessToken: token
    });
  }
}
