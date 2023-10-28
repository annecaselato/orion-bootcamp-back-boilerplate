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
   *                 checkbox:
   *                   type: boolean
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
   *                   token:
   *                     type: string
   *       '401':
   *           description: 'Requisição não autorizada'
   */

  async login(req: Request, res: Response) {
    const { email, password, checkbox } = req.body;
    try {
      const result = await new UserService().authenticate(
        email,
        password,
        checkbox
      );
      if (result) {
        return res.json({
          email: email,
          token: result
        });
      } else {
        return res
          .status(401)
          .json({ mensagem: 'Incorrect username or password' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /**
   * @swagger
   * /loading:
   *   get:
   *     summary: Rota com usuario logado
   *     security:
   *       - BearerAuth: []
   *     tags: [Login]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       '200':
   *           description: 'Acesso a rota autorizado'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   autorização:
   *                     type: boolean
   *                   userId:
   *                     type: string
   *       '401':
   *           description: 'Acesso a rota negado'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   autorização:
   *                     type: boolean
   */
  loggedUser(req: Request, res: Response) {
    return res.send({ userId: req.body });
  }
}
