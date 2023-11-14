import { Request, Response } from 'express';
import { PlanCard } from '../entity/PlanCard';
import { PlanCardRepository } from '../repositories/planCardRepository';

/**
 * Controller for exposing data in the soles endpoint, and also saving the data to the database.
 */
export class PlanCardController {
  /**
   * @swagger
   * /v1/plan-cards:
   *   get:
   *     summary: Exposes planCards data for frontend data consumption, after saving this data in the database.
   *     tags: [PlanCards]
   *     description: Plan Card Title, description, image and button text
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: JSON with plan cards data shown successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 planCard:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                     planCardTitle:
   *                       type: string
   *                     planCardDescription:
   *                       type: string
   *                     planCardImage:
   *                       type: string
   *                     planCardButtonText:
   *                       type: string
   *       400:
   *         description: Error when trying to get plan cards
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async getPlanCards(req: Request, res: Response): Promise<void> {
    try {
      const allPlanCards: PlanCard[] = await PlanCardRepository.getAllPlanCards();

      res.status(200).json(allPlanCards);
    } catch {
      res.status(400).json({ error: 'Erro ao buscar cartões de planos' });
    }
  }
}
