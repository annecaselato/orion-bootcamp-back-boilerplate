import { MysqlDataSource } from '../config/database';
import { Repository } from 'typeorm';
import { JwtUtils } from '../library/jwtUtils';
import { User } from '../entity/Users';

interface UserRepository extends Repository<User> {
  addPasswordRecoveryToken(user: User, userId: number): Promise<string>;
}

export const userRepository = MysqlDataSource.getRepository(
  User
) as UserRepository;

userRepository.addPasswordRecoveryToken = async (
  user: User,
  userId: number
): Promise<string> => {
  return JwtUtils.addPasswordRecoveryToken(user, userId);
};
