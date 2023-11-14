import { PlanCard } from '../entity/PlanCards';
import { MigrationInterface, QueryRunner, DeepPartial } from 'typeorm';

const PLANCARDS: DeepPartial<PlanCard>[] = [
  {
    planCardTitle: 'Plano Pesquisador (Premium)',
    planCardDescription: 'Desbloqueie acesso total às maravilhas de Marte com o Plano Pesquisador (Premium) do Orion Marte.',
    planCardImage: 'http://amigoviolao.com/wp-content/uploads/2023/11/img_pesquisador_plan_Orion_Marte.jpg',
    planCardButtonText: 'VEJA COMO SE TORNAR UM PESQUISADOR'
  },
  {
    planCardTitle: 'Plano Astronauta (Enterprise)',
    planCardDescription:
      'Maximize seu potencial explorador com o Plano Astronauta: soluções personalizadas, suporte exclusivo e pacote Premium.',
    planCardImage: 'http://amigoviolao.com/wp-content/uploads/2023/11/img_astronauta_plan_Orion_Marte.jpg',
    planCardButtonText: 'VEJA COMO SE TORNAR UM ASTRONAUTA'
  }
];

/**
 * Saves the above data as PlanCards in the database
 */
export class AddPlanCards1699903465157 implements MigrationInterface {
  /**
   * up
   *
   * For each of the PLANCARDS objects, creates a new entry for the PlanCard Entity
   *
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const planCard of PLANCARDS) {
      const newPlanCard = await queryRunner.manager.create('PlanCard', {
        planCardTitle: planCard.planCardTitle,
        planCardDescription: planCard.planCardDescription,
        planCardImage: planCard.planCardImage,
        planCardButtonText: planCard.planCardButtonText
      });

      await queryRunner.manager.save('PlanCard', newPlanCard);
    }
  }

  /**
   * down
   *
   * Deletes PlanCards from the PlanCardEntity, if they match PLANCARDS objects.
   *
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const planCard of PLANCARDS) {
      await queryRunner.manager.delete('PlanCards', { planCardTitle: planCard.planCardTitle });
    }
  }
}
