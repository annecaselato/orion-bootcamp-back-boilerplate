import Character from '../entity/Character';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacter1699055195428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Character)
      .values([
        {
          idMarvel: 11111,
          enName: 'Captain America',
          ptName: 'Capitão América',
          description: 'capitao que defende a america',
          thumb: 'http://qwdwqdq.com/qwdwqdwq.jpg',
          isTranslated: true,
          createdAt: new Date(),
          lastUpdate: new Date()
        },
        {
          idMarvel: 22222,
          enName: 'Iron Man',
          ptName: 'Homem de Ferro',
          description: 'homem com armadura de ferro',
          thumb: 'http://qwdwqdq.com/qw31asddjjgwq.jpg',
          isTranslated: true,
          createdAt: new Date(),
          lastUpdate: new Date()
        },
        {
          idMarvel: 1009664,
          enName: 'Thor',
          ptName: 'Thor',
          description:
            'Como o Deus nórdico do trovão e dos relâmpagos, Thor empunha uma das armas mais poderosas já feitas, o martelo encantado Mjolnir. Embora outros tenham descrito Thor como um imbecil musculoso e desajeitado, ele é bastante inteligente e compassivo. Ele é autoconfiante e nunca, de forma alguma, deixaria de lutar por uma causa que valha a pena.',
          thumb:
            'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350.jpg',
          isTranslated: true,
          createdAt: new Date(),
          lastUpdate: new Date()
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
