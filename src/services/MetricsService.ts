import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Metrics } from '../database/entity/Metrics';
import { UserService } from '../services/UserService';

export class MetricsService {
  private metricsRepository: Repository<Metrics>;

  constructor() {
    this.metricsRepository = MysqlDataSource.getRepository(Metrics);
  }

  async registers(): Promise<number> {
    const userCount = await new UserService().registersCompleted();
    this.metricsRepository.update(1, { quantity: userCount });
    return userCount;
  }
}
