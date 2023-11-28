import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Metrics } from '../database/entity/UserMetric';
import { Metric } from '../models/enumMetrics';

export class UserMetricsService {
  private metricRepository: Repository<Metrics>;

  constructor() {
    this.metricRepository = MysqlDataSource.getRepository(Metrics);
  }

  public async updateRegistrationStarted(): Promise<void> {
    if (Metric.STARTED) {
      await this.metricRepository.increment(
        { metric: Metric.STARTED },
        'quantity',
        1
      );
    }
  }

  public async updateRegistrationIncompleted(): Promise<void> {
    if (Metric.INCOMPLETED) {
      await this.metricRepository.increment(
        { metric: Metric.INCOMPLETED },
        'quantity',
        1
      );
    }
  }
}
