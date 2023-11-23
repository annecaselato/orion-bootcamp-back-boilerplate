import { MysqlDataSource } from '../config/database';
import Character from '../entity/Character';
import { CharacterSeries } from '../entity/CharacterSeries';
import Series from '../entity/Series';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacterSeries1700755081662
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characterRepository = MysqlDataSource.getRepository(Character);
    const seriesRepository = MysqlDataSource.getRepository(Series);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Series)
      .values([
        {
          idMarvel: 2473,
          enTitle: 'Thor (2007 - 2011)',
          ptTitle: 'Thor (2007 - 2011)',
          description:
            'Ameaças a Asgard e Midgard, cuidado: O Poderoso Thor terá contigo! Acompanhe as jornadas épicas e batalhas brutais do Odinson enquanto enfrenta Gigantes de Gelo, demônios de fogo, super vilões e qualquer outra coisa que ele possa alcançar com seu martelo!',
          thumb:
            'http://i.annihil.us/u/prod/marvel/i/mg/8/f0/511c0ce715de6.jpg',
          isTranslated: true,
          createdAt: new Date(),
          lastUpdate: new Date()
        }
      ])
      .execute();

    const character1: Character = await characterRepository.findOne({
      where: {
        idMarvel: 1009664
      }
    });

    const series1: Series = await seriesRepository.findOne({
      where: {
        idMarvel: 2473
      }
    });

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(CharacterSeries)
      .values([
        {
          character: character1,
          series: series1
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
