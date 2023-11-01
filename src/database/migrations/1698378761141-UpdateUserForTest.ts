import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';

export class UpdateUserForTest1698378761141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      User,
      { email: 'gustavogonçalves@gmail.com' },
      {
        password: '$2b$10$MAoK6ESnu5Ja.H1xVwGEAeoLZloUEd/iwambFafPxcky.1k4d1E9O'
      }
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      User,
      { email: 'gustavogonçalves@gmail.com' },
      {
        password: 'Gu@12345'
      }
    );
  }
}
