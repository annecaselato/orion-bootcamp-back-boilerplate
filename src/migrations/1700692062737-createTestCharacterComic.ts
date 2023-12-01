import { MysqlDataSource } from '../config/database';
import Character from '../entity/Character';
import { CharacterComics } from '../entity/CharacterComics';
import Comic from '../entity/Comic';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacterComic1700692062737
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Comic)
      .values([
        {
          idMarvel: 999999,
          enTitle: 'Thor (2020) #34',
          ptTitle: 'Thor (2020) #34',
          description:
            'THOR, DOUTOR DESTINO e... THANOS?! Enquanto Thor disputa uma corrida temporal com o Doutor Destino antes que Destino possa despedaçar a própria realidade em sua mais recente busca por poder, eles descobrem Thanos no centro de tudo, finalmente revelando a luta de poder que levou o avô de Thor, Bor, e Thanos a uma guerra total - a arma derradeira, escondida por milênios. Mas Destino não poupará esforços para controlá-la!',
          thumb:
            'http://i.annihil.us/u/prod/marvel/i/mg/8/e0/646b6a2ec150d.jpg',
          isTranslated: true,
          createdAt: new Date(),
          lastUpdate: new Date()
        }
      ])
      .execute();

    const character1: Character = await queryRunner.manager.findOne(Character, {
      where: {
        idMarvel: 1009664
      }
    });

    const comic1: Comic = await queryRunner.manager.findOne(Comic, {
      where: {
        idMarvel: 999999
      }
    });

    if (character1 && comic1) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(CharacterComics)
        .values([
          {
            character: character1,
            comic: comic1
          }
        ])
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
