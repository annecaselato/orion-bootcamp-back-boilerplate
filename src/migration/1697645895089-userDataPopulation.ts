import { MigrationInterface, QueryRunner } from 'typeorm';
import { BcryptUtils } from '../library/bcryptUtils';

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
  /**
   * Executa as operações de inserção de dados na tabela "Users" durante a migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.
   * @returns Uma Promise que é resolvida quando a operação é concluída.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      const hashedPassword: string = BcryptUtils.hashPassword(user.password);

      await queryRunner.manager.save('Users', {
        email: user.email,
        password: hashedPassword
      });
    }
  }

  /**
   * Executa as operações de exclusão de dados na tabela "Users" durante a reversão da migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.
   * @returns Uma Promise que é resolvida quando a operação é concluída.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.manager.delete('Users', { email: user.email });
    }
  }
}
