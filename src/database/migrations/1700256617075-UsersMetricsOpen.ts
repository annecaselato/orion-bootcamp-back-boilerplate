import { Metrics } from '../entity/UserMetric';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMetricsOpen1700256617075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Metrics, {
      metric: 'Registrations Started',
      quantity: 0
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Metrics, {
      metric: 'Registrations Started',
      quantity: 0
    });
  }
}
