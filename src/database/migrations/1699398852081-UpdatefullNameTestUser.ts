import { User } from '../entity/User';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatefullNameTestUser1699398852081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ fullName: 'Gustavo Gonçalves da Silva' })
      .where('email = email', { email: 'gustavogonçalves@gmail.com' })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ fullName: '' })
      .where('email = email', { email: 'gustavogonçalves@gmail.com' })
      .execute();
  }
}
