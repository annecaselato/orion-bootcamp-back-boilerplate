import { MysqlDataSource } from '../config/database';
import { User } from '../entity/User';
import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export class AuthController {
  /**
   * @swagger
   * /login:
   *   post:
   *
   *     summary: Login
   *     tags: [Auth]
   *     requestBody:
   *       description: Envio dos dados de login
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             example:
   *               email: teste@teste.com
   *               password: teste123
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       '201':
   *           description: 'Autenticação bem sucedida.'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   date:
   *                     type: object
   *                   status:
   *                     type: boolean
   *                   data:
   *                     type: string
   *                     description: 'objeto json de retorno'
   *       '401':
   *           description: 'Autenticação falhou.'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   date:
   *                     type: object
   *                   status:
   *                     type: boolean
   *                   data:
   *                     type: string
   *                     description: 'objeto json de retorno'
   *       '500':
   *           description: 'Erro interno.'
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   date:
   *                     type: object
   *                   status:
   *                     type: boolean
   *                   data:
   *                     type: string
   *                     description: 'objeto json de retorno'
   *
   *
   *
   */
  async login(req: Request, res: Response) {
    const userRepository = MysqlDataSource.getRepository(User);

    try {
      //encontra usuario no banco de dados pelo email
      const user: User = await userRepository.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        return res
          .status(401)
          .send({ date: new Date(), status: false, data: 'E-mail inválido.' });
      }

      //conferir flag de ativação
      if (!user.isActivated) {
        return res.status(401).send({
          date: new Date(),
          status: false,
          data: 'Necessária a confirmação do cadastro pelo e-mail.'
        });
      }

      //conferir senha
      const passwordIsValid: boolean = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ date: new Date(), status: false, data: 'Senha inválida.' });
      }

      //atribuir token jwt
      const token: string = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: 'HS256',
          expiresIn: 7200 //2 horas
        }
      );

      return res
        .status(201)
        .send({ date: new Date(), status: true, data: token });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.'
      });
    }
  }
}
