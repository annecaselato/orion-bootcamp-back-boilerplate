import { Request, Response } from 'express';
import User from '../entity/User';
import { MysqlDataSource } from '../config/database';
import Character from '../entity/Character';
import Comic from '../entity/Comic';
import Series from '../entity/Series';
import Story from '../entity/Story';
import Event from '../entity/Event';
import { Repository } from 'typeorm';
import { Category, insertNewClickMetric } from '../utils/cardsMetricsUtils';
import { UserFavorites } from '../entity/UserFavorites';
import { CharacterComics } from '../entity/CharacterComics';
import {
  getComicsByCharacter,
  getEventsByCharacter,
  getSeriesByCharacter,
  getStoriesByCharacter
} from '../utils/cardsDetailsUtils';

/**
 * Classe com operações relacionadas à operações relacionadas a cards exibidos na aplicação
 */
//TODO: alterar nome do controller para algo como CardsController (sugestão)
export class CharacterController {
  /**
   * @swagger
   *
   * /v1/{category}/{category_id}:
   *   get:
   *
   *     summary: Requisita informações sobre um card
   *     description: Retorna detalhes sobre um card selecionado e realiza a contabilização da métrica de cliques por usuário por card
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
   *       - in: path
   *         name: category_id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: o ID do recurso
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
   *                 data: 'O usuário 4 selecionou o recurso 1 da categoria characters'
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
   *                 data: "Recurso não encontrado."
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
  async getCardDetails(req: Request, res: Response) {
    const cardCategory: Category = req.params.category as Category;
    const category_id: number = Number(req.params.category_id);

    switch (cardCategory) {
      case Category.Characters:
        //encontrar o character
        const characterRepository = MysqlDataSource.getRepository(Character);

        const character: Character = await characterRepository.findOne({
          where: {
            id: category_id
          }
        });

        //pegar todos as series, eventos, stories e comics do character selecionado
        const series = await getSeriesByCharacter(character);
        const events = await getEventsByCharacter(character);
        const stories = await getStoriesByCharacter(character);
        const comics = await getComicsByCharacter(character);

        const objResp = {
          characterName: character.enName,
          characterDescription: character.description,
          comicsList: comics,
          seriesList: series,
          storiesList: stories,
          eventsList: events
        };

        return res.status(200).send(objResp);

        break;
    }
  }

  /**
   * @swagger
   *
   * /v1/{category}:
   *   get:
   *
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
   *         required: false
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Página desejada
   *       - in: query
   *         name: search
   *         required: false
   *         schema:
   *           type: string
   *         description: Texto de busca especificado
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
      const pageNumber: number = Number(req.query.page) || 1;
      const searchText: string = (req.query.search as string) || '';

      const offset = (pageNumber - 1) * 9;
      const limit = 9;

      let found;

      switch (pageCategory) {
        case Category.Characters:
          const charactersRepository = MysqlDataSource.getRepository(Character);

          found = await charactersRepository
            .createQueryBuilder('characters')
            .where(
              'characters.enName LIKE :character_name OR characters.ptName LIKE :character_name',
              {
                character_name: `%${searchText}%`
              }
            );

          break;

        case Category.Comics:
          const comicsRepository = MysqlDataSource.getRepository(Comic);

          found = await comicsRepository
            .createQueryBuilder('comics')
            .where(
              'comics.enTitle LIKE :comic_title OR comics.ptTitle LIKE :comic_title',
              {
                comic_title: `%${searchText}%`
              }
            );

          break;

        case Category.Series:
          const seriesRepository = MysqlDataSource.getRepository(Series);

          found = await seriesRepository
            .createQueryBuilder('series')
            .where(
              'series.enTitle LIKE :series_title OR series.ptTitle LIKE :series_title',
              {
                series_title: `%${searchText}%`
              }
            );

          break;

        case Category.Stories:
          const storiesRepository = MysqlDataSource.getRepository(Story);

          found = await storiesRepository
            .createQueryBuilder('stories')
            .where(
              'stories.enTitle LIKE :story_title OR stories.ptTitle LIKE :story_title',
              {
                story_title: `%${searchText}%`
              }
            );

          break;
        case Category.Events:
          const eventsRepository = MysqlDataSource.getRepository(Event);

          found = await eventsRepository
            .createQueryBuilder('events')
            .where(
              'events.enTitle LIKE :event_title OR events.ptTitle LIKE :event_title',
              {
                event_title: `%${searchText}%`
              }
            );

          break;
      }

      const cards = await found.skip(offset).take(limit).getMany();

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
      console.log('Erro: ', error);
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.'
      });
    }
  }

  /**
   * @swagger
   *
   * /v1/favorite/{character_id}:
   *   get:
   *     summary: Favorita ou desfavorita um personagem especificado para o usuário corrente
   *     description: Se o personagem não tiver sido favoritado pelo usuário antes, uma entrada de favorito dele é criada.
   *                   Caso contrário, se o personagem já tiver sido favoritado anteriormente, sua entrada de favorito é removida.
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
   *                 data: 'O usuário 4 favoritou o personagem 1'
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
  async favoriteCharacter(req: Request, res: Response) {
    try {
      const character_id: number = Number(req.params.character_id);
      const user_id: number = req.body.user.id;

      const userRepository = MysqlDataSource.getRepository(User);
      const characterRepository = MysqlDataSource.getRepository(Character);
      const userFavoritesRepository =
        MysqlDataSource.getRepository(UserFavorites);

      //procura para ver se a entrada de favorito já existe
      const favoriteEntry = await userFavoritesRepository.findOne({
        where: { user: { id: user_id }, character: { id: character_id } }
      });

      if (favoriteEntry) {
        //remove dos favoritos
        await MysqlDataSource.manager.remove(favoriteEntry);

        return res.status(200).send({
          date: new Date(),
          status: true,
          data:
            'O usuário ' +
            req.body.user.id +
            ' desfavoritou o personagem ' +
            character_id
        });
      } else {
        //adiciona nos favoritos
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

        //cria nova entrada de favorito na tabela
        const favoriteEntry = new UserFavorites();
        favoriteEntry.user = user;
        favoriteEntry.character = character;

        await MysqlDataSource.manager.save(favoriteEntry);

        return res.status(200).send({
          date: new Date(),
          status: true,
          data:
            'O usuário ' +
            req.body.user.id +
            ' favoritou o personagem ' +
            character_id
        });
      }
    } catch (error) {
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.'
      });
    }
  }
}
