import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  constructor(private service: UserService) {}
  /**
   * @swagger
   * /:
   *   post:
   *     summary: Hello
   *     tags: [Password]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       '200':
   *           description: 'requisição executada com sucesso'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   status:
   *                     type: boolean
   *                   data:
   *                     type: object
   *                     description: 'objeto json de retorno'
   */
  async recoverPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await this.service.recoverPassword(email);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}
