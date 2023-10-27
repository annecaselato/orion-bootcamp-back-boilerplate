import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UsersController {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Rota para login do usuário
   *     tags: [Login]
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
   *                 password:
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
   *                   password:
   *                     type: string
   *                     example: Gu@12345
   *       '401':
   *           description: 'Requisição não autorizada'
   *       '500':
   *           description: 'Problema interno do servidor'
   */

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await new UserService().authenticate(email, password);
      if (result) {
        return res.json({
          email: email,
          result: result
        });
      } else {
        return res.status(401).json({ mensagem: 'Usuario ou senha incorreto' });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}
