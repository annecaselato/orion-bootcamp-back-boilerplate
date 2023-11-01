import { Request, Response } from 'express';
import { NasaService } from '../services/nasaService';
import { Sol } from '../entity/Sol';
import { SolRepository } from '../repositories/solRepository';

export class SolController {
  /**
   * @swagger
   * /v1/soles:
   *   get:
   *     summary: Exposes soles data for frontend data consumption.
   *     responses:
   *       200:
   *         description: JSON with soles data shown successfully
   *       500:
   *         description: Internal error when fetching the data
   */
  public static async getSoles(req: Request, res: Response): Promise<void> {
    try {
      const latestSols: NasaService = new NasaService();

      const solesData: Sol[] = await latestSols.getFirstFourteenSoles();

      await SolRepository.Save14MarsDays(solesData);

      res.status(200).json(solesData);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar dados dos soles' });
    }
  }
}
