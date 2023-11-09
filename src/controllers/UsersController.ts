import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import bcrypt from 'bcrypt';

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

  async newUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const emailAlreadyInUse = await new UserService().findByEmail(email);
      if (emailAlreadyInUse) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      const salt = bcrypt.genSaltSync(10);
      const newPassword = bcrypt.hashSync(password, salt);
      const newUser = await new UserService().newUser(
        firstName,
        lastName,
        email,
        newPassword
      );
      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
