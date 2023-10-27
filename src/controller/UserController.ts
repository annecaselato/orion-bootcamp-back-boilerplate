import { Request, Response } from 'express';
import { Repository } from '../repository/userRepository';

export class UserController {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Hello
   *     tags: [Home]
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
  hello(_req: Request, res: Response) {
    return res.status(200).send('Hello');
  }

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Adiciona novo usuário ao banco de dados
   *     tags: [signUp]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       '201':
   *         description: 'Requisição executada com sucesso'
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 date:
   *                   type: Date
   *                 status:
   *                   type: boolean
   *                 data:
   *                   type: object
   *                   description: 'Objeto JSON de retorno'
   *                   properties:
   *                     id: 6
   *                     name: "tester"
   *                     gender: "female"
   *                     birth_date: "2001-01-10T00:00:00.000Z"
   *                     email: "teste_3@email.com"
   *                     created_at: "2023-10-26T23:23:07.000Z"
   *                     last_update: "2023-10-26T23:23:07.000Z"
   *                     isActivated: false
   *       '400':
   *         description: 'Falha em um ou mais dados fornecidos na requisição'
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 date:
   *                   type: Date
   *                 status:
   *                   type: boolean
   *                 data:
   *                   type: object
   *                   description: 'Objeto JSON de retorno'
   *                   properties:
   *       '500':
   *         description: 'Erro interno do servidor. Não foi possível processar os dados no banco'
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 date:
   *                   type: Date
   *                 status:
   *                   type: boolean
   *                 data:
   *                   type: object
   *                   description: 'Objeto JSON de retorno'
   *                   properties:
   */
  createUser = async (req: Request, res: Response) => {
    try {
      const repository = new Repository();
      const user = repository.createAndSave(req);
      const savedUser = await repository.findOneByEmail((await user).email);
      res.status(201).json({ date: new Date(), status: true, data: savedUser });
    } catch (error) {
      res
        .status(500)
        .json({ date: new Date(), status: false, data: error.message });
    }
  };
}
