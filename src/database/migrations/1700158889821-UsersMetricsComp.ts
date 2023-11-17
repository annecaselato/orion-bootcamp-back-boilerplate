import { Metrics } from '../entity/UserMetric';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMetrics1700158889821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Metrics, {
      metric: 'Registrations Completed',
      quantity: 0
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Metrics, {
      metric: null,
      quantity: null
    });
  }
}
