import { Tokens } from '../entity/Tokens';

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInicialToken1701495078026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Tokens, {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAxNDk0NjI1LCJleHAiOjE3MDE1ODEwMjV9.RjXQ254i7g_bS7cwVC94LBaAYTfXIfmaErgiI_Qo8dQ'
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Tokens, {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAxNDk0NjI1LCJleHAiOjE3MDE1ODEwMjV9.RjXQ254i7g_bS7cwVC94LBaAYTfXIfmaErgiI_Qo8dQ'
    });
  }
}
