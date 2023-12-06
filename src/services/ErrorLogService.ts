import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { ErrorLog } from '../database/entity/ErrorLog';

export class ErrorLogService {
  private errorLogRepository: Repository<ErrorLog>;

  constructor() {
    this.errorLogRepository = MysqlDataSource.getRepository(ErrorLog);
  }

  public async insertError(error): Promise<void> {
    await this.errorLogRepository.insert({
      errorDescription: error
    });
  }
}
