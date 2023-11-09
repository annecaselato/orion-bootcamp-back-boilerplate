import { User } from '../entity/User';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserColumns1699492520317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      User,
      { email: 'gustavogonçalves@gmail.com' },
      {
        firstName: 'Gustavo',
        lastName: 'Gonçalves da Silva'
      }
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      User,
      { email: 'gustavogonçalves@gmail.com' },
      {
        firstName: null,
        lastName: null
      }
    );
  }
}
