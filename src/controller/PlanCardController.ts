import { Request, Response } from 'express';
import { PlanCard } from '../entity/PlanCard';
import { PlanCardRepository } from '../repositories/planCardRepository';

export class PlanCardController {
  public static async getPlanCards(req: Request, res: Response): Promise<void> {
    try {
      const allPlanCards: PlanCard[] = await PlanCardRepository.getAllPlanCards();

      res.status(200).json(allPlanCards);
    } catch {
      res.status(400).json({ error: 'Erro ao buscar cartões de planos' });
    }
  }
}
