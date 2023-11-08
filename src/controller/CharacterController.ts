import { Request, Response } from 'express';
import { User } from '../entity/User';
import { MysqlDataSource } from '../config/database';
import { Character } from '../entity/Character';
import { Metrics } from '../entity/Metrics';

/**
 * @swagger
 *
 * /v1/select/{character_id}:
 *   get:
 *     summary: Requisita informações sobre personagem
 *     description: Retorna detalhes sobre um personagem selecionado e realiza a contabilização da métrica de cliques por usuário por card
 *     security:
 *       - BearerAuth: []
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: character_id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: o ID do personagem
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
 *                 data: 'O usuário 4 selecionou o personagem 1'
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
 *                 data: "Personagem não encontrado."
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
  async countClick(req: Request, res: Response) {
    try {
      const character_id: number = Number(req.params.character_id);
      const user_id: number = req.body.user.id;

      const userRepository = MysqlDataSource.getRepository(User);
      const characterRepository = MysqlDataSource.getRepository(Character);
      const metricsRepository = MysqlDataSource.getRepository(Metrics);

      //procura para ver se a métrica já existe
      const metric = await metricsRepository.findOne({
        where: { user: { id: user_id }, character: { id: character_id } }
      });

      if (metric) {
        metric.clicks += 1;

        await metricsRepository.save(metric);
      } else {
        //find no usuario
        const user: User = await userRepository.findOne({
          where: {
            id: user_id
          }
        });

        if (!user) {
          return res.status(404).send({
            date: new Date(),
            status: false,
            data: 'Usuário não encontrado.'
          });
        }

        //find no personagem
        const character: Character = await characterRepository.findOne({
          where: {
            id: character_id
          }
        });

        if (!character) {
          return res.status(404).send({
            date: new Date(),
            status: false,
            data: 'Personagem não encontrado.'
          });
        }

        //cria nova métrica na tabela
        const metricsEntry = new Metrics();
        metricsEntry.user = user;
        metricsEntry.character = character;
        metricsEntry.clicks = 1;

        await MysqlDataSource.manager.save(metricsEntry);
      }

      return res.status(200).send({
        date: new Date(),
        status: true,
        data:
          'O usuário ' +
          req.body.user.id +
          ' selecionou o personagem ' +
          character_id
      });
    } catch (error) {
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.'
      });
    }
  }
}
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
