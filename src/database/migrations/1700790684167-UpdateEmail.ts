import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../entity/Users';

export class UpdateEmail1700790684167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      Users,
      { email: 'gustavogonçalves@gmail.com' },
      {
        email: 'gustavogoncalves@gmail.com'
      }
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      Users,
      { email: 'gustavogoncalves@gmail.com' },
      {
        email: 'gustavogonçalves@gmail.com'
      }
    );
  }
}
