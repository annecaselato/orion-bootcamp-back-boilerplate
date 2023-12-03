import { Request, Response } from 'express';
import { MetricService } from '../services/MetricService';
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
   *     responses:
   *       '204':
   *           description: 'Cadastro iniciado.'
   */
  updateMetricOpen(req_: Request, res: Response) {
    const metricService = new MetricService();
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
   *     responses:
   *       '204':
   *           description: 'Cadastro não finalizado.'
   */
  updateMetricIncomplete(req_: Request, res: Response) {
    const metricService = new MetricService();
    metricService.updateRegistrationIncompleted();
    return res.status(httpCodes.NO_CONTENT);
  }
}
