import { MysqlDataSource } from '../config/database';
import UserAccessLog from '../entity/UserAccessLog';
import User from '../entity/User';

export default class UserAccessLogService {
  static async logUserAccess(user: User) {
    const userAccessLogRepository =
      MysqlDataSource.getRepository(UserAccessLog);

    const userAccessLog = new UserAccessLog();
    userAccessLog.user = user;

    await userAccessLogRepository.save(userAccessLog);
  }
}
