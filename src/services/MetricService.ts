import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Metrics } from '../database/entity/Metrics';
import { Metric } from '../models/enumMetrics';

export class MetricService {
  private metricsRepository: Repository<Metrics>;

  constructor() {
    this.metricsRepository = MysqlDataSource.getRepository(Metrics);
  }

  public async registers(): Promise<void> {
    await this.metricsRepository.increment(
      { metric: Metric.COMPLETED },
      'quantity',
      1
    );
  }

  public async updateRegistrationStarted(): Promise<void> {
    await this.metricsRepository.increment(
      { metric: Metric.STARTED },
      'quantity',
      1
    );
  }

  public async updateRegistrationIncompleted(): Promise<void> {
    await this.metricsRepository.increment(
      { metric: Metric.INCOMPLETED },
      'quantity',
      1
    );
  }
}
