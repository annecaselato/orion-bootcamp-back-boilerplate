import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import httpCodes from '../utils/httpCodes';
import { Result, ValidationError, validationResult } from 'express-validator';

export class UserController {
  constructor(
    private service: UserService,
    private httpcodes: httpCodes
  ) {}
  /**
   * @swagger
   * /recover-password:
   *   post:
   *     summary: Rota para redefinir senha do usuário.
   *     tags: [Recove Password]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 email:
   *                   type: string
   *     responses:
   *       '200':
   *           description: 'OK'
   *       '400':
   *           description: 'Solicitação inválida'
   */
  async recoverPassword(req: Request, res: Response) {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(this.httpcodes.BAD_REQUEST)
          .json({ errors: errors.array() });
      }

      const { email } = req.body;
      await this.service.recoverPassword(email);
      return res.status(this.httpcodes.OK).json('OK');
    } catch (error) {
      return res.status(this.httpcodes.BAD_REQUEST).json({ error });
    }
  }
}
