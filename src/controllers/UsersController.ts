import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { httpCodes } from '../utils/httpCodes';
import bcrypt from 'bcrypt';

export class UsersController {
  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: Rota para login do usuário
   *     tags: [Users]
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
    const { email, password, rebemberMe } = req.body;
    try {
      const result = await new UserService().authenticate(
        email,
        password,
        rebemberMe
      );
      if (result) {
        return res.status(httpCodes.OK).json({
          email: email,
          token: result
        });
      } else {
        return res
          .status(httpCodes.UNAUTHORIZED)
          .json({ mensagem: 'Incorrect username or password' });
      }
    } catch (error) {
      return res.status(httpCodes.BAD_REQUEST).json(error);
    }
  }
  /**
   * @swagger
   * /users/logged:
   *   get:
   *     summary: Rota com usuario logado
   *     security:
   *       - BearerAuth: []
   *     tags: [Users]
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
    return res.status(httpCodes.OK).send({ user: req.body.authUser });
  }

  /**
   * @swagger
   * /users/recover-password:
   *   post:
   *     summary: Rota para redefinir senha do usuário.
   *     tags: [Users]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               example:
   *                 email: email@email.com
   *               type: object
   *               properties:
   *                 email:
   *                   type: string
   *     responses:
   *       '204':
   *           description: 'OK'
   *       '400':
   *           description: 'Solicitação inválida'
   */
  async recoverPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await new UserService().recoverPassword(email);
      return res.status(httpCodes.NO_CONTENT).send();
    } catch (error) {
      return res.status(httpCodes.BAD_REQUEST).json(error);
    }
  }

<<<<<<< HEAD
  async registerUserEmail(req: Request, res: Response) {
    const { email, username } = req.body;
    try {
      const result = await new UserService().emailWelcome(email, username);

      if (result) {
        return res.status(httpCodes.OK).json('OK');
      }
    } catch (error) {
      return res.status(httpCodes.BAD_REQUEST).json({ error });
    }
=======
  /**
   * @swagger
   * /users/new-user:
   *   post:
   *     summary: Rota para criar novo usuário.
   *     tags: [Users]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               example:
   *                 firstName: nome
   *                 lastName: sobrenome
   *                 email: email@email.com
   *                 password: 123456A#
   *               type: object
   *               properties:
   *                 firstName:
   *                   type: string
   *                 lastName:
   *                   type: sring
   *                 email:
   *                   type: string
   *                 password:
   *                   type: string
   *     responses:
   *       '201':
   *           description: 'Dados do usuário cadastrado'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   createdAt:
   *                     type: string
   *                   id:
   *                     type: number
   *                   firstName:
   *                     type: string
   *                   lastName:
   *                     type: sring
   *                   email:
   *                     type: string
   *
   *       '400':
   *           description: 'Solicitação inválida.'
   */

  async newUser(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    const emailAlreadyInUse = await new UserService().findByEmail(email);
    if (emailAlreadyInUse) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: 'Email already in use' });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const { id, createdAt } = await new UserService().newUser(
      firstName,
      lastName,
      email,
      newPassword
    );
    return res
      .status(httpCodes.CREATED)
      .json({ user: { createdAt, id, firstName, lastName, email } });
>>>>>>> e7cea84ca854631a7099899c80697e7fc437386b
  }
}
