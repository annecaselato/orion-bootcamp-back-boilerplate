import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../entity/Users';

export class InsertInitialUsersForTest1697830893779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Users, {
      email: 'gustavogonçalves@gmail.com',
      password: 'Gu@12345'
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Users, {
      email: 'gustavogonçalves@gmail.com'
    });
  }
}
