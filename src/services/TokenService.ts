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

  async removeToken(token: string) {
    await this.tokenRepository.delete({ token });
  }

  async getToken(token: string) {
    return await this.tokenRepository.findOneBy({ token });
  }
}
