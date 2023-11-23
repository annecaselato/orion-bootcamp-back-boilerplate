import { MysqlDataSource } from '../config/database';
import Character from '../entity/Character';
import { CharacterComics } from '../entity/CharacterComics';
import Comic from '../entity/Comic';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacterComic1700692062737
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characterRepository = MysqlDataSource.getRepository(Character);
    const comicRepository = MysqlDataSource.getRepository(Comic);

    const character1: Character = await characterRepository.findOne({
      where: {
        idMarvel: 1009664
      }
    });

    const comic1: Comic = await comicRepository.findOne({
      where: {
        idMarvel: 110723
      }
    });

    const comic2: Comic = await comicRepository.findOne({
      where: {
        id: 2
      }
    });

    const comic3: Comic = await comicRepository.findOne({
      where: {
        id: 3
      }
    });

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(CharacterComics)
      .values([
        {
          character: character1,
          comic: comic1
        },
        {
          character: character1,
          comic: comic2
        },
        {
          character: character1,
          comic: comic3
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
