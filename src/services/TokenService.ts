import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Tokens } from '../database/entity/Tokens';

export class TokenService {
  private tokenRepository: Repository<Tokens>;

  constructor() {
    this.tokenRepository = MysqlDataSource.getRepository(Tokens);
  }

  public async deleteLoginToken(token: string): Promise<void> {
    await this.tokenRepository.delete({ token });
  }

  public async saveToken(token): Promise<void> {
    await this.tokenRepository.save({ token: token });
  }

  async getToken(token: string): Promise<Tokens> {
    return await this.tokenRepository.findOneBy({ token });
  }
}
