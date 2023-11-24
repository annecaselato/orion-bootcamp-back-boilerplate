import { MigrationInterface, QueryRunner } from 'typeorm';
import { HomePageCard } from '../entity/HomePageCard';
import { originalHOMEPAGECARD } from '../constants/originalHomePageCards';
import { updatedHOMEPAGECARD } from '../constants/updatedHomePageCards';

/**
 * Esta classe representa uma migração que atualiza os cards da página inicial.
 */
export class UpdateHomePageCards1700827119550 implements MigrationInterface {
  /**
   * Este método é chamado quando a migração é aplicada.
   * @param queryRunner - O executor de consultas do TypeORM.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(HomePageCard);

    for (const updatedCardData of updatedHOMEPAGECARD) {
      const existingCard = await homePageCardRepository.findOne({ where: { title: updatedCardData.cardTitle } });

      if (existingCard) {
        existingCard.title = updatedCardData.cardTitle;
        existingCard.image = updatedCardData.cardImage;
        existingCard.description = updatedCardData.cardDescription;
        existingCard.imageDescription = updatedCardData.cardImageDescription;
        existingCard.buttonText = updatedCardData.cardButtonText;
        existingCard.access = updatedCardData.cardAccess;

        await homePageCardRepository.save(existingCard);
      }
    }
  }

  /**
   * Reverte a migration para os cards antigos.
   *
   * @param queryRunner - O executor de consultas do TypeORM.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(HomePageCard);

    for (const originalCardData of originalHOMEPAGECARD) {
      const existingCard = await homePageCardRepository.findOne({ where: { title: originalCardData.title } });

      if (existingCard) {
        existingCard.title = originalCardData.title;
        existingCard.image = originalCardData.image;
        existingCard.description = originalCardData.description;
        existingCard.access = originalCardData.access;

        await homePageCardRepository.save(existingCard);
      }
    }
  }
}
