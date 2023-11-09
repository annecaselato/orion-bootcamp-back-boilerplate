import { User } from '../entity/User';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserColumns1699492520317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ firstName: 'Gustavo', lastName: 'Gonçalves da Silva' })
      .where('email = email', { email: 'gustavogonçalves@gmail.com' })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ firstName: '', lastName: '' })
      .where('email = email', { email: 'gustavogonçalves@gmail.com' })
      .execute();
  }
}
