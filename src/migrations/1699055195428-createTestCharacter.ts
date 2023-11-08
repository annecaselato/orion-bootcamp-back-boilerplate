import { Character } from '../entity/Character';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacter1699055195428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Character)
      .values([
        {
          en_name: 'Captain America',
          pt_name: 'Capitão América',
          description: 'capitao que defende a america',
          thumb: 'http://qwdwqdq.com/qwdwqdwq.jpg'
        },
        {
          en_name: 'Iron Man',
          pt_name: 'Homem de Ferro',
          description: 'homem com armadura de ferro',
          thumb: 'http://qwdwqdq.com/qw31asddjjgwq.jpg'
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
