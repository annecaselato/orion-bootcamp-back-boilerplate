import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Metrics } from '../database/entity/Metrics';

export class MetricsService {
  private metricsRepository: Repository<Metrics>;

  constructor() {
    this.metricsRepository = MysqlDataSource.getRepository(Metrics);
  }

  registers(): Promise<Metrics> {
    this.metricsRepository.increment(
      { metric: 'Registrations Completed ' },
      'quantity',
      1
    );
    const usersCount = this.metricsRepository.findOne({
      where: { metric: 'Registrations Completed ' }
    });
    return usersCount;
  }
}
