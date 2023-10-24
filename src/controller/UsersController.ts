import { Request, Response } from 'express';
import { UserAutenticator } from '../services/UserService';

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
   *                 useremail:
   *                   type: string
   *                 userpassword:
   *                   type: string
   *     responses:
   *       '200':
   *           description: 'Credenciais confirmadas, login realizado com sucesso'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   email:
   *                     type: string
   *                     example: gustavogonçalves@gmail.com
   *                   senha:
   *                     type: string
   *                     example: Gu@12345
   *       '401':
   *           description: 'Credenciais incorretas, login não realizado'
   */

  userAutenticator = new UserAutenticator();

  login = async (req: Request, res: Response) => {
    const { email, userpassword } = req.body;

    try {
      const user = await this.userAutenticator.userLogin(email, userpassword);

      if (user) {
        res.json({ message: 'Login realizado com sucesso' });
      } else {
        res.status(401).json({ message: 'Usuário ou senha incorreto' });
      }
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro durante a autenticação' });
    }
  };
}
