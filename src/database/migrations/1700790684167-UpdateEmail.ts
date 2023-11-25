import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';

export class UpdateEmail1700790684167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      User,
      { email: 'gustavogonçalves@gmail.com' },
      {
        email: 'gustavogoncalves@gmail.com'
      }
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      User,
      { email: 'gustavogoncalves@gmail.com' },
      {
        email: 'gustavogonçalves@gmail.com'
      }
    );
  }
}
