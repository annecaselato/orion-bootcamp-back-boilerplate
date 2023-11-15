import { Request, Response } from 'express';
import { User } from '../entity/User';
import { MysqlDataSource } from '../config/database';
import { Character } from '../entity/Character';
import { UserCharacterClicks } from '../entity/UserCharacterClicks';
import { Comic } from '../entity/Comic';
import { Series } from '../entity/Series';
import { Story } from '../entity/Story';
import { Event } from '../entity/Event';
import { Repository } from 'typeorm';
import { UserComicClicks } from '../entity/UserComicClicks';
import { UserSeriesClicks } from '../entity/UserSeriesClicks';
import { UserStoryClicks } from '../entity/UserStoryClicks';
import { UserEventClicks } from '../entity/UserEventClicks';

enum Category {
  Characters = 'characters',
  Comics = 'comics',
  Series = 'series',
  Stories = 'stories',
  Events = 'events'
}

async function insertNewMetricEntry(
  category: Category,
  metricEntry,
  userRepository,
  metricsRepository,
  user_id: number,
  category_id: number
) {
  //find no usuario
  const user: User = await userRepository.findOne({
    where: {
      id: user_id
    }
  });

  if (!user) {
    return {
      statusCode: 404,
      resp: {
        date: new Date(),
        status: false,
        data: 'Usuário não encontrado.'
      }
    };
  }

  //find no personagem
  const character: Character = await metricsRepository.findOne({
    where: {
      id: category_id
    }
  });

  if (!character) {
    return {
      statusCode: 404,
      resp: {
        date: new Date(),
        status: false,
        data: "Recurso da categoria '" + category + "' não encontrado."
      }
    };
  }

  metricEntry.user = user;
  metricEntry.character = character;
  metricEntry.clicks = 1;

  await MysqlDataSource.manager.save(metricEntry);

  return {
    statusCode: 200,
    resp: {
      date: new Date(),
      status: true,
      data:
        'O usuário ' +
        user_id +
        ' selecionou o recurso ' +
        category_id +
        " da categoria '" +
        category +
        "'."
    }
  };
}

export class CharacterController {
  /**
   * @swagger
   *
   * /v1/select/{category_id}:
   *   get:
   *     summary: Requisita informações sobre personagem
   *     description: Retorna detalhes sobre um personagem selecionado e realiza a contabilização da métrica de cliques por usuário por card
   *     security:
   *       - BearerAuth: []
   *     tags: [Characters]
   *     parameters:
   *       - in: path
   *         name: category_id
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
  async countClick(req: Request, res: Response) {
    try {
      const cardCategory: Category = req.params.category as Category;
      const category_id: number = Number(req.params.category_id);
      const user_id: number = req.body.user.id;

      const userRepository = MysqlDataSource.getRepository(User);

      let statusCode, resp;

      //resposta padrão
      statusCode = 200;
      resp = {
        date: new Date(),
        status: true,
        data:
          'O usuário ' +
          user_id +
          ' selecionou o recurso ' +
          category_id +
          " da categoria '" +
          cardCategory +
          "'."
      };

      let metricsRepository, categoryRepository;
      let metricEntry;

      switch (cardCategory) {
        case Category.Characters:
          categoryRepository = MysqlDataSource.getRepository(Character);
          metricsRepository =
            MysqlDataSource.getRepository(UserCharacterClicks);

          //procura para ver se a métrica já existe
          metricEntry = await metricsRepository.findOne({
            where: { user: { id: user_id }, character: { id: category_id } }
          });

          if (metricEntry) {
            //metrica já existe
            metricEntry.clicks += 1;
            await metricsRepository.save(metricEntry);
          } else {
            //métrica é criada
            ({ statusCode, resp } = await insertNewMetricEntry(
              cardCategory,
              new UserCharacterClicks(),
              userRepository,
              categoryRepository,
              user_id,
              category_id
            ));
          }

          break;

        case Category.Comics:
          categoryRepository = MysqlDataSource.getRepository(Comic);
          metricsRepository = MysqlDataSource.getRepository(UserComicClicks);

          //procura para ver se a métrica já existe
          metricEntry = await metricsRepository.findOne({
            where: { user: { id: user_id }, comic: { id: category_id } }
          });

          if (metricEntry) {
            //metrica já existe
            metricEntry.clicks += 1;
            await metricsRepository.save(metricEntry);
          } else {
            //métrica é criada
            ({ statusCode, resp } = await insertNewMetricEntry(
              cardCategory,
              new UserComicClicks(),
              userRepository,
              categoryRepository,
              user_id,
              category_id
            ));
          }

          break;

        case Category.Series:
          categoryRepository = MysqlDataSource.getRepository(Series);
          metricsRepository = MysqlDataSource.getRepository(UserSeriesClicks);

          //procura para ver se a métrica já existe
          metricEntry = await metricsRepository.findOne({
            where: { user: { id: user_id }, series: { id: category_id } }
          });

          if (metricEntry) {
            //metrica já existe
            metricEntry.clicks += 1;
            await metricsRepository.save(metricEntry);
          } else {
            //métrica é criada
            ({ statusCode, resp } = await insertNewMetricEntry(
              cardCategory,
              new UserSeriesClicks(),
              userRepository,
              categoryRepository,
              user_id,
              category_id
            ));
          }

          break;

        case Category.Stories:
          categoryRepository = MysqlDataSource.getRepository(Story);
          metricsRepository = MysqlDataSource.getRepository(UserStoryClicks);

          //procura para ver se a métrica já existe
          metricEntry = await metricsRepository.findOne({
            where: { user: { id: user_id }, story: { id: category_id } }
          });

          if (metricEntry) {
            //metrica já existe
            metricEntry.clicks += 1;
            await metricsRepository.save(metricEntry);
          } else {
            //métrica é criada
            ({ statusCode, resp } = await insertNewMetricEntry(
              cardCategory,
              new UserStoryClicks(),
              userRepository,
              categoryRepository,
              user_id,
              category_id
            ));
          }

          break;

        case Category.Events:
          categoryRepository = MysqlDataSource.getRepository(Event);
          metricsRepository = MysqlDataSource.getRepository(UserEventClicks);

          //procura para ver se a métrica já existe
          metricEntry = await metricsRepository.findOne({
            where: { user: { id: user_id }, event: { id: category_id } }
          });

          if (metricEntry) {
            //metrica já existe
            metricEntry.clicks += 1;
            await metricsRepository.save(metricEntry);
          } else {
            //métrica é criada
            ({ statusCode, resp } = await insertNewMetricEntry(
              cardCategory,
              new UserEventClicks(),
              userRepository,
              categoryRepository,
              user_id,
              category_id
            ));
          }

          break;
      }

      return res.status(statusCode).send(resp);
    } catch (error) {
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu: ',
        error
      });
    }
  }

  /**
   * @swagger
   *
   * /v1/{category}:
   *   get:
   *     summary: Requisita páginas de uma categoria especificada
   *     description: Retorna uma quantidade de 9 cards por página da categoria especificada
   *     security:
   *       - BearerAuth: []
   *     tags: [Characters]
   *     parameters:
   *       - in: path
   *         name: category
   *         required: true
   *         schema:
   *           type: string
   *           enum:
   *             - characters
   *             - comics
   *             - series
   *             - stories
   *             - events
   *         description: Categoria desejada
   *       - in: query
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
   *                 data: <ARRAY DE OBJETOS JSON>
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
  async getPage(req: Request, res: Response) {
    try {
      const pageCategory: Category = req.params.category as Category;
      const page: number = Number(req.query.page);

      const offset = (page - 1) * 9;
      const limit = 9;

      let cards;

      switch (pageCategory) {
        case Category.Characters:
          const charactersRepository = MysqlDataSource.getRepository(Character);

          cards = await charactersRepository.find({
            take: limit,
            skip: offset
          });

          break;

        case Category.Comics:
          const comicsRepository = MysqlDataSource.getRepository(Comic);

          cards = await comicsRepository.find({
            take: limit,
            skip: offset
          });

          break;

        case Category.Series:
          const seriesRepository = MysqlDataSource.getRepository(Series);

          cards = await seriesRepository.find({
            take: limit,
            skip: offset
          });

          break;

        case Category.Stories:
          const storiesRepository = MysqlDataSource.getRepository(Story);

          cards = await storiesRepository.find({
            take: limit,
            skip: offset
          });

          break;
        case Category.Events:
          const eventsRepository = MysqlDataSource.getRepository(Event);

          cards = await eventsRepository.find({
            take: limit,
            skip: offset
          });

          break;
      }

      if (cards.length === 0) {
        return res.status(404).send({
          date: new Date(),
          status: false,
          data: 'Página não encontrada.'
        });
      }

      return res
        .status(200)
        .json({ date: new Date(), status: true, data: cards });
    } catch (error) {
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.'
      });
    }
  }
}
