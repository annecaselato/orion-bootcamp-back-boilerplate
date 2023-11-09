import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: number;
};
export class UsersController {
  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: Rota para login do usuário
   *     tags: [Login]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             example:
   *               email: user@email.com
   *               password: pass123
   *               rebemberMe: true
   *             required:
   *               - email
   *               - password
   *               - rebemberMe
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               rebemberMe:
   *                 type: boolean
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
    const { email, password, rememberMe } = req.body;
    try {
      const result = await new UserService().authenticate(
        email,
        password,
        rememberMe
      );
      if (result) {
        return res.status(200).json({
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
   * /users/logged:
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
   *                   id:
   *                     type: number
   *                   email:
   *                     type: string
   *       '401':
   *           description: 'Acesso a rota negado'
   */
  loggedUser(req: Request, res: Response) {
    return res.status(200).send({ user: req.body.authUser });
  }

  /**
   * @swagger
   * /users/password-change:
   *   patch:
   *     summary: Rota para alteração de senha
   *     tags: [Senha]
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
   *               token: token jwt
   *               password: pass@123
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '204':
   *           description: 'Senha alterada com sucesso.'
   *       '400':
   *           description: 'Senha invalida ou Usuario não encontrado.'
   */
  updatePassword(req: Request, res: Response) {
    const userService = new UserService();
    const { token, password } = req.body;
    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;
      if (id) {
        userService.updatePassword(id, password);
        return res.status(204);
      } else {
        return res
          .status(400)
          .json({ mensagem: 'Invalid password or user not found.' });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ mensagem: 'Invalid password or user not found.' });
    }
  }
}
