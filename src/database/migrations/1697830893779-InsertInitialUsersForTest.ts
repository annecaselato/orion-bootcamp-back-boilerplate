import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';

export class InsertInitialUsersForTest1697830893779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(User, {
      email: 'gustavogonçalves@gmail.com',
      password: 'Gu@12345'
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {
      email: 'gustavogonçalves@gmail.com'
    });
  }
}
