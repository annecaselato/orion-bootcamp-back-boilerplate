import { Request, Response } from 'express';
import { NasaService } from '../services/nasaService';
import { Sol } from '../entity/Sol';
import { SolRepository } from '../repositories/solRepository';

/**
 * Controller for exposing data in the soles endpoint, and also saving the data to the database.
 */
export class SolController {
  /**
   * @swagger
   * /v1/soles:
   *   get:
   *     summary: Exposes soles data for frontend data consumption, after saving this data in the database.
   *     tags: [Soles]
   *     security:
   *       - bearerAuth: []
   *     description: Days and climate data from mars. Maximum and minimum temperatures each mars day.
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: JSON with soles data shown successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 sol:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                     solNumberMarsDay:
   *                       type: number
   *                     maximumTemperature:
   *                       type: number
   *                     minimumTemperature:
   *                       type: number
   *       500:
   *         description: Internal error when fetching the data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async getSoles(req: Request, res: Response): Promise<void> {
    try {
      const latestSols: NasaService = new NasaService();
      const solesData = await latestSols.getFirstFourteenSoles();
      await SolRepository.save14MarsDays(solesData);
      const listedSoles: Sol[] = await SolRepository.listSoles();
      res.status(200).json(listedSoles);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar dados dos soles' });
    }
  }
}
