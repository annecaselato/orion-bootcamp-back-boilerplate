import { Request, Response } from 'express';
import { MysqlDataSource } from '../config/database';
import { Character } from '../entity/Character';

/**
 * @swagger
 *
 * /v1/getCharacters/{page}:
 *   get:
 *     summary: Requisita páginas de personagens
 *     description: Retorna uma quantidade variável de personagens a depender da página selecionada
 *     security:
 *       - BearerAuth: []
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Página desejada
 *     responses:
 *       '200':
 *           description: 'Requisição bem sucedida.'
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
 *               example:
 *                 date: {}
 *                 status: true
 *                 data: <ARRAY DE PERSONAGENS JSON>
 *       '404':
 *           description: 'Requisição falhou.'
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
 *               example:
 *                 date: {}
 *                 status: false
 *                 data: "Página não encontrada."
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
 *               example:
 *                 date: {}
 *                 status: false
 *                 data: "Um erro interno ocorreu."
 *
 */
export class CharacterController {
  async getCharactersPage(req: Request, res: Response) {
    try {
      const page: number = Number(req.params.page);
      const characterRepository = MysqlDataSource.getRepository(Character);

      const offset = (page - 1) * 9;
      const limit = Math.min(100, page * 9); //valor máximo de 100 no limit

      const characters = await characterRepository.find({
        take: limit,
        skip: offset
      });

      if (characters.length === 0) {
        return res.status(404).send({
          date: new Date(),
          status: false,
          data: 'Página não encontrada.'
        });
      }

      return res
        .status(200)
        .json({ date: new Date(), status: true, data: characters });
    } catch (error) {
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.'
      });
    }
  }
}
