import { Request, Response } from 'express';
import NasaApi from '../utils/NasaApi';
import WeatherApiTreat from '../utils/WeatherApiTreat';
import { httpCodes } from '../utils/httpCodes';
import { ErrorLogService } from '../services/ErrorLogService';

export class MetereologyController {
  /**
   * @swagger
   * /metereology/soles:
   *   get:
   *     summary: Rota para receber os sóis e suas informações.
   *     security:
   *       - BearerAuth: []
   *     tags: [Metereology]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       '200':
   *           description: 'Requisição dos sóis'
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     sol:
   *                       type: string
   *                     max_temp:
   *                       type: string
   *                     min_temp:
   *                       type: string
   *                     terrestrial_date:
   *                       type: string
   *                     mars_uv:
   *                       type: string
   *                     pressure:
   *                       type: string
   *                     sunset:
   *                       type: string
   *                     sunrise:
   *                       type: string
   *       '400':
   *           description: 'Solicitação inválida.'
   */
  async getSolesInWeatherApi(_req: Request, res: Response) {
    const nasaApi = new NasaApi();
    try {
      const solesInput = await nasaApi.getSolesInWeatherApi();
      const solesOutput = new WeatherApiTreat().modifySolesKeys(solesInput);
      return res.status(httpCodes.OK).json(solesOutput);
    } catch (error) {
      const err: string = '/metereology/soles: ' + error.message;
      await new ErrorLogService().insertError(err);
      return res.status(httpCodes.BAD_REQUEST).json(error);
    }
  }
}
