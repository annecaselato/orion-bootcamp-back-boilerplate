import { Request, Response, NextFunction } from 'express';
import { Repository } from '../repository/UserRepository';
import { User } from '../entity/User';

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
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nome do usuário
   *               gender:
   *                 type: string
   *                 description: Gênero do usuário
   *               birthDate:
   *                 type: string
   *                 description: Data de nascimento do usuário
   *                 format: date
   *               email:
   *                 type: string
   *                 description: Endereço de e-mail do usuário
   *               password:
   *                 type: string
   *                 description: Senha do usuário
   *     responses:
   *       '201':
   *         description: Requisição executada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: ID do usuário
   *                     name:
   *                       type: string
   *                       description: Nome do usuário
   *                     gender:
   *                       type: string
   *                       description: Gênero do usuário
   *                     birthDate:
   *                       type: string
   *                       description: Data de nascimento do usuário
   *                     email:
   *                       type: string
   *                       description: Endereço de e-mail do usuário
   *                     createdAt:
   *                       type: string
   *                       description: Data de criação do usuário
   *                     lastUpdate:
   *                       type: string
   *                       description: Data de atualização do usuário
   *                     isActivated:
   *                       type: boolean
   *                       description: Status de ativação do usuário
   *       '400':
   *         description: Um ou mais dados fornecidos na requisição não atendem aos pré-requisitos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       message:
   *                         type: string
   *                         description: Mensagem de erro
   *       '500':
   *         description: Erro interno do servidor. Não foi possível processar os dados no banco
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     message:
   *                       type: string
   *                       description: Mensagem de erro
   */

  create = async (req: Request, res: Response) => {
    try {
      const repository: Repository = new Repository();
      const user: Promise<User> = repository.createAndSave(req);
      const savedUser: User = await repository.findOneByEmail(
        (await user).email
      );
      res.status(201).json({ date: new Date(), status: true, data: savedUser });
    } catch (error) {
      res
        .status(500)
        .json({ date: new Date(), status: false, data: error.message });
    }
  };
}
