import { PlanCard } from '../entity/PlanCards';
import { MigrationInterface, QueryRunner, DeepPartial } from 'typeorm';

const PLANCARDS: DeepPartial<PlanCard>[] = [
  {
    planCardTitle: 'Plano Pesquisador (Premium)',
    planCardDescription: 'Desbloqueie acesso total às maravilhas de Marte com o Plano Pesquisador (Premium) do Orion Marte.',
    planCardImage: 'Caminho/imagem',
    planCardButtonText: 'VEJA COMO SE TORNAR UM PESQUISADOR'
  },
  {
    planCardTitle: 'Plano Astronauta (Enterprise)',
    planCardDescription:
      'Maximize seu potencial explorador com o Plano Astronauta: soluções personalizadas, suporte exclusivo e pacote Premium.',
    planCardImage: 'Caminho/imagem',
    planCardButtonText: 'VEJA COMO SE TORNAR UM ASTRONAUTA'
  }
];

export class AddPlanCards1699903465157 implements MigrationInterface {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const planCard of PLANCARDS) {
      await queryRunner.manager.delete('PlanCards', { planCardTitle: planCard.planCardTitle });
    }
  }
}
