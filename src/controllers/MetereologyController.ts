import { Request, Response } from 'express';
import NasaApi from '../utils/NasaApi';
import WeatherApiFilter from '../utils/WeatherApiFilter';
import { httpCodes } from '../utils/httpCodes';

export class MetereologyController {
  /**
   * @swagger
   * /users/soles:
   *   post:
   *     summary: Rota para receber os sóis e suas informações.
   *     tags: [Users]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               example:
   *                 signature: premium
   *               type: object
   *               properties:
   *                 signature:
   *                   type: string
   *     responses:
   *       '200':
   *           description: 'Requisição dos sóis baseado na assinatura'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   sol:
   *                     type: string
   *                   max_temp:
   *                     type: string
   *                   min_temp:
   *                     type: string
   *                   terrestrial_date:
   *                     type: Date
   *                   pressure:
   *                     type: string
   *                   local_uv_irradiance_index:
   *                     type: string
   *                   sunrise:
   *                     type: string
   *                   sunset:
   *                     type: string
   *       '400':
   *           description: 'Solicitação inválida.'
   */
  async getSolesInWeatherApi(req: Request, res: Response) {
    const { signature } = req.body;
    const nasaApi = new NasaApi();
    try {
      const solesInput = await nasaApi.getSolesInWeatherApi();
      const solesOutput = new WeatherApiFilter().filterSolesKeysBySignature(
        signature,
        solesInput
      );
      return res.status(httpCodes.OK).json(solesOutput);
    } catch (error) {
      return res.status(httpCodes.BAD_REQUEST).json(error);
    }
  }
}
