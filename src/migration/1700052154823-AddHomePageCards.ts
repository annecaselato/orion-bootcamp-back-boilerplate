import { MigrationInterface, QueryRunner } from 'typeorm';
import { HomePageCard } from '../entity/HomePageCard';

/**
 * Data for HomePageCards to be added to the database.
 */
const HOMEPAGECARD = [
  {
    title: 'Meteorologia em Marte',
    image: 'https://drive.google.com/file/d/1k-wTXR6GFm7W6Xi02xijACngsBsDcjUJ/view?usp=drive_link',
    description: 'Veja a previsão do tempo em Marte ao vivo! Descubra como são as temperaturas no planeta vermelho.',
    access: 'Accessible'
  },
  {
    title: 'Viagens para Marte',
    image: 'https://drive.google.com/file/d/1fHiJggloNlqhD-cFH0aJ3J25cWLBkpMS/view?usp=drive_link',
    description: 'O calendário 2023 para Marte está fechado! Em breve abriremos novas inscrições para visitações em 2025.',
    access: 'Accessible'
  },
  {
    title: 'Notícias de Marte',
    image: 'https://drive.google.com/file/d/1pdUGy4t5jp7e_AiVYvM2Jo_yexCiElKZ/view?usp=drive_link',
    description: 'Ansioso por notícias? Logo mais estará disponível o blog “FalaOrion”, seu portal de notícias da Via Láctea!',
    access: 'Accessible'
  },
  {
    title: 'Explore Marte em 3D',
    image: 'https://drive.google.com/file/d/1qha8-Njq93fOyVeH9K2_4E-EmoIGOo9E/view?usp=drive_link',
    description: 'Uma jornada interativa através do Planeta Vermelho. Veja, aprenda e mergulhe na sua superfície intrigante.',
    access: 'Accessible Only from Premium'
  },
  {
    title: 'Fórum sobre Marte',
    image: 'https://drive.google.com/file/d/187xQc1CFGXE-zYLDv2P4h1h4U0kB3D4h/view?usp=drive_link',
    description: 'Participe de discussões envolventes, compartilhe conhecimento e conecte-se com entusiastas.',
    access: 'Not Accessible Yet'
  },
  {
    title: 'Adquira sua lembrança marciana',
    image: 'https://drive.google.com/file/d/1TVfsaibC6urbiA9wzF4O8-4PwiCsdpCB/view?usp=drive_link',
    description: 'Descubra produtos exclusivos de Marte e leve um pedaço do Planeta Vermelho para casa.',
    access: 'Not Accessible Yet'
  }
];

/**
 * Migration to add HomePageCards to the database.
 */
export class AddHomePageCards1700052154823 implements MigrationInterface {
  /**
   * up
   * Run the migration and creates all the cards stated above in the HOMEPAGECARD const.
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(HomePageCard);

    for (const homePageCardData of HOMEPAGECARD) {
      const newHomePageCard = homePageCardRepository.create({
        title: homePageCardData.title,
        image: homePageCardData.image,
        description: homePageCardData.description,
        access: homePageCardData.access
      });

      await homePageCardRepository.save(newHomePageCard);
    }
  }

  /**
   * down
   * Reverts the migration.
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(HomePageCard);

    for (const homePageCardData of HOMEPAGECARD) {
      const cardToDelete = await homePageCardRepository.findOneBy({ title: homePageCardData.title });
      if (cardToDelete) {
        await homePageCardRepository.delete(cardToDelete.id);
      }
    }
  }
}
