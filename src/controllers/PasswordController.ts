import { Request, Response } from 'express';
import { PasswordService } from '../services/PasswordService';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: number;
};

export class PasswordController {
  /**
   * @swagger
   * /password/change:
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
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '200':
   *           description: 'Password changed successfully!'
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
   *       '400':
   *           description: 'Invalid password.'
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
   *       '500':
   *           description: 'User not found.'
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
  updatePassword(req: Request, res: Response) {
    try {
      const passwordService = new PasswordService();
      const { token, password } = req.body;
      const { id } = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;
      passwordService.authenticate(id, password);
      return res
        .status(200)
        .json({ message: 'Password changed successfully!' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
