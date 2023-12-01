import { Metric } from '../../models/enumMetrics';
import { Metrics } from '../entity/Metrics';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMetricsOpen1700256617075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Metrics, {
      metric: Metric.STARTED,
      quantity: 0
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Metrics, {
      metric: Metric.STARTED
    });
  }
}
