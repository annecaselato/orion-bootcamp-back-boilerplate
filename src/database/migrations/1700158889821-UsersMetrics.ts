import { Metrics } from '../entity/UsersMetrics';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMetrics1700158889821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Metrics, {
      metric: 'Registrations Completed ',
      quantity: 1
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Metrics, {
      metric: 'Registrations Completed ',
      quantity: 0
    });
  }
}
