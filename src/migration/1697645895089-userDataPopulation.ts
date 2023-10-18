import { MigrationInterface, QueryRunner } from 'typeorm';

const USERS = [
  {
    email: 'user1@test.com',
    password: '123456'
  },
  {
    email: 'user2@test.com',
    password: 'abcdef'
  }
];

export class UserDataPopulation1697645895089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [user.email, user.password]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.query('DELETE FROM users WHERE email = ?', [
        user.email
      ]);
    }
  }
}
