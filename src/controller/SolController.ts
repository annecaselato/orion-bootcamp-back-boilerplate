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
   *     tags:
   *       - soles
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

      const solesData: Sol[] = await latestSols.getFirstFourteenSoles();

      /**
       *Here the sols ares sorted in DESCENDING order, in regards to the solNumberMarsDay field
       *  in order to have it correctly saved in the database.
       */
      solesData.sort((a: Sol, b: Sol) => a.solNumberMarsDay - b.solNumberMarsDay);

      await SolRepository.Save14MarsDays(solesData);

      /**
       *Here the sols ares sorted in ASCENDING order, because it allows for the JSON
       *  provided to be in descending order (contrary to the database), for easier
       *  fetching in the front end.
       */
      solesData.sort((a: Sol, b: Sol) => b.solNumberMarsDay - a.solNumberMarsDay);

      res.status(200).json(solesData);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar dados dos soles' });
    }
  }
}
