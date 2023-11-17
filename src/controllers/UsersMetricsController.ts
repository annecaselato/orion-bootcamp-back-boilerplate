import { Request, Response } from 'express';
import { UserMetricsService } from '../services/UserMetricsService';
import { httpCodes } from '../utils/httpCodes';

export class UsersMetricsController {
  /**
   * @swagger
   * /metrics/registration-started:
   *   patch:
   *     summary: Rota para monitorar metricas de cadastros iniciados
   *     tags: [Metrics]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             example:
   *               metric: 'Registrations Started'
   *             type: object
   *             properties:
   *               metric:
   *                 type: string
   *     responses:
   *       '200':
   *           description: 'Cadastro iniciado.'
   */
  updateMetricOpen(req: Request, res: Response) {
    const metricService = new UserMetricsService();
    const { metric } = req.body;
    if (metric === 'Registrations Started') {
      metricService.updateRegSta(metric);
      return res
        .status(httpCodes.OK)
        .json({ mensagem: 'Registrations Started.' });
    } else {
      return res.status(httpCodes.UNAUTHORIZED);
    }
  }

  /**
   * @swagger
   * /metrics/incomplete-registrations:
   *   patch:
   *     summary: Rota para monitorar metricas de cadastros incompletos
   *     tags: [Metrics]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             example:
   *               metric: 'Registrations Incompleted'
   *             type: object
   *             properties:
   *               metric:
   *                 type: string
   *     responses:
   *       '200':
   *           description: 'Cadastro não finalizado.'
   *       '400':
   *           description: 'Cadastro concluido.'
   */
  updateMetricInc(req: Request, res: Response) {
    const metricService = new UserMetricsService();
    const { metric } = req.body;
    if (metric === 'Registrations Incompleted') {
      metricService.updateRegInc(metric);
      return res
        .status(httpCodes.OK)
        .json({ mensagem: 'Registration incompleted.' });
    } else {
      return res
        .status(httpCodes.UNAUTHORIZED)
        .json({ mensagem: 'Registration completed.' });
    }
  }
}
