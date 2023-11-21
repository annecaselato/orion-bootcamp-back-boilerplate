import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Metrics } from '../database/entity/UserMetric';
import { Metric } from '../utils/enumMetrics';

export class UserMetricsService {
  private metricRepository: Repository<Metrics>;

  constructor() {
    this.metricRepository = MysqlDataSource.getRepository(Metrics);
  }

  public async updateRegistrationStarted(metric): Promise<void | undefined> {
    if (metric === Metric.RegistrationStarted) {
      await this.metricRepository.increment(
        { metric: Metric.RegistrationStarted },
        'quantity',
        1
      );
    }
  }

  public async updateRegistrationIncompleted(
    metric
  ): Promise<void | undefined> {
    if (metric === Metric.RegistrationIncompleted) {
      await this.metricRepository.increment(
        { metric: Metric.RegistrationIncompleted },
        'quantity',
        1
      );
    }
  }
}
