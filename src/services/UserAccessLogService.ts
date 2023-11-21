import { MysqlDataSource } from '../config/database';
import UserAccessLog from '../entity/UserAccessLog';
import User from '../entity/User';

/**
 * Classe que possui métodos úteis para o registro de logins de usuários no banco.
 */
export default class UserAccessLogService {

  /**
   * @param {User} user - Usuário que realizou o login
   */
  static async logUserAccess(user: User) {
    const userAccessLogRepository =
      MysqlDataSource.getRepository(UserAccessLog);

    const userAccessLog = new UserAccessLog();
    userAccessLog.user = user;

    await userAccessLogRepository.save(userAccessLog);
  }
}
