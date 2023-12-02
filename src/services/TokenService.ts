import { MysqlDataSource } from '../config/database';
import { Token } from '../database/entity/Token';
import { Repository } from 'typeorm';

export class TokenService {
  private tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = MysqlDataSource.getRepository(Token);
  }

  async saveToken(token: string) {
    await this.tokenRepository.save({ token });
  }
}
