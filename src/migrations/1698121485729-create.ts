import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';
import { MysqlDataSource } from '../config/database';

export class PostRefactoring1698121485729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await MysqlDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'testone',
          gender: 'unknown',
          birth_date: new Date('01/01/2001'),
          email: 'betaorionisorion@gmail.com',
          password: 'Ab@12345'
        },
        {
          name: 'testtwo',
          gender: 'female',
          birth_date: new Date('01/01/1990'),
          email: 'email@gmail.com',
          password: 'Ab@12345'
        }
      ])
      .execute();
    //await queryRunner.mananger.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

