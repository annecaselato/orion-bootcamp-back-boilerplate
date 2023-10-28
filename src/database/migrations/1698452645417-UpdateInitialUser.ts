import { User } from '../entity/User';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInitialUser1698452645417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ name: 'Gustavo Gonçalves' })
      .where('id = id', { id: 1 })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ name: '' })
      .where('id = id', { id: 1 })
      .execute();
  }
}
