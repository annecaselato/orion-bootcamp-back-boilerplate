import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';

export class CreateTestUsers1698447684549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'testone',
          gender: 'homem (cis ou trans)',
          birthDate: '2001-12-05',
          email: 'betaorionisorion@gmail.com',
          password:
            '$2b$10$9FzlGkF2pLcch5Scd/mpje3Nybkx7RjxqVwkk6X09VGrDIFjlgJSu', // No uso real o usuário passa a senha e não a hash
          createdAt: new Date(),
          lastUpdate: new Date()
        },
        {
          name: 'testtwo',
          gender: 'prefiro não informar',
          birthDate: '1990-04-25',
          email: 'email@gmail.com',
          password:
            '$2b$10$s.2ud3F4f4Z6i9OsoYFEtuFZC0wFIilycyjukBd5x/45w1qj/J3Le', // No uso real o usuário passa a senha e não a hash
          createdAt: new Date(),
          lastUpdate: new Date()
        }
      ])
      .execute();
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
