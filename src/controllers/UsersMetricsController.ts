import { Request, Response } from 'express';
import { MetricsService } from '../services/MetricsService';
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
   *       '204':
   *           description: 'Cadastro iniciado.'
   */
  updateMetricOpen(req_: Request, res: Response) {
    const metricService = new MetricsService();
    metricService.updateRegistrationStarted();
    return res.status(httpCodes.NO_CONTENT);
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
   *       '204':
   *           description: 'Cadastro não finalizado.'
   */
  updateMetricIncomplete(req_: Request, res: Response) {
    const metricService = new MetricsService();
    metricService.updateRegistrationIncompleted();
    return res.status(httpCodes.NO_CONTENT);
  }
}
