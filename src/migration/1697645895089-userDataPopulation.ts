import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

const USERS = [
  {
    email: 'user1@test.com',
    password: 'Pa$$word123'
  },
  {
    email: 'user2@test.com',
    password: 'Pa$$word321'
  }
];

export class UserDataPopulation1697645895089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.manager.save('Users', {
        email: user.email,
        password: user.password
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.manager.delete('Users', { email: user.email });
    }
  }
}
