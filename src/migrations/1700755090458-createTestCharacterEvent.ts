import { MysqlDataSource } from '../config/database';
import Character from '../entity/Character';
import { CharacterEvents } from '../entity/CharacterEvents';
import Event from '../entity/Event';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCharacterEvent1700755090458
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const characterRepository = MysqlDataSource.getRepository(Character);
    const eventRepository = MysqlDataSource.getRepository(Event);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Event)
      .values([
        {
          idMarvel: 235,
          enTitle: 'Blood and Thunder',
          ptTitle: 'Sangue e Trovão',
          description:
            'Enlouquecido pelas maquinações da malévola Valquíria, Thor parte para destruir os Nove Mundos, mas encontra oposição do Surfista Prateado, Warlock e a Guarda do Infinito.',
          thumb:
            'http://i.annihil.us/u/prod/marvel/i/mg/3/d0/51c9e9945b152.jpg',
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

    const event1: Event = await eventRepository.findOne({
      where: {
        idMarvel: 235
      }
    });

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(CharacterEvents)
      .values([
        {
          character: character1,
          event: event1
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
