import { MysqlDataSource } from '../config/database';
import Character from '../entity/Character';
import { CharacterStories } from '../entity/CharacterStories';
import Story from '../entity/Story';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacterStory1700755075527
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characterRepository = MysqlDataSource.getRepository(Character);
    const storyRepository = MysqlDataSource.getRepository(Story);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Story)
      .values([
        {
          idMarvel: 876,
          enTitle: 'THOR (1998) #76',
          ptTitle: 'THOR (1998) #76',
          description: '',
          thumb: '',
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

    const story1: Story = await storyRepository.findOne({
      where: {
        idMarvel: 876
      }
    });

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(CharacterStories)
      .values([
        {
          character: character1,
          story: story1
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
