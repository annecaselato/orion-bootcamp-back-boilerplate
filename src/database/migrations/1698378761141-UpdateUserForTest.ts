import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../entity/Users';

export class UpdateUserForTest1698378761141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      Users,
      { email: 'gustavogonçalves@gmail.com' },
      {
        password: '$2b$10$MAoK6ESnu5Ja.H1xVwGEAeoLZloUEd/iwambFafPxcky.1k4d1E9O'
      }
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      Users,
      { email: 'gustavogonçalves@gmail.com' },
      {
        password: 'Gu@12345'
      }
    );
  }
}
