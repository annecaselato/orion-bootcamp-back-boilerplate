import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { OK, BAD_REQUEST } from '../utils/httpCodes';

export class UserController {
  constructor(private service: UserService) {}
  /**
   * @swagger
   * /recover-password:
   *   post:
   *     summary: Rota para redefinir senha do usuário.
   *     tags: [Password]
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
   *           description: 'Requisição executada com sucesso'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   email:
   *                     type: string
   *                     example: gustavogonçalves@gmail.com
   *       '500':
   *           description: 'Problema interno do servidor'
   */
  async recoverPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await this.service.recoverPassword(email);
      return res.status(OK).json();
    } catch (error) {
      return res.status(BAD_REQUEST).json({ error });
    }
  }
}
