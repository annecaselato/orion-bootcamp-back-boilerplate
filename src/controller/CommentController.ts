import { MysqlDataSource } from '../config/database';
import { Request, Response } from 'express';
import { Category } from '../utils/cardsMetricsUtils';
import { Comments } from '../entity/Comments';

export class CommentController {
  /**
   * @swagger
   *
   * /v1/comments/{category}/{categoryId}:
   *   get:
   *
   *     summary: Requisita página de comentários
   *     description: Retorna uma quantidade de 3 comentários, por página, ordenados por data
   *     security:
   *       - BearerAuth: []
   *     tags: [Comments]
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
   *         description: Categoria do card
   *       - in: path
   *         name: categoryId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: o ID do card
   *       - in: query
   *         name: page
   *         required: false
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Página desejada de comentários
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
  async getComments(req: Request, res: Response) {
    try {
      const category = req.params.category as Category;
      const categoryId: number = Number(req.params.categoryId);
      const userId = req.body.user.id;

      const commentPage: number = Number(req.query.page) || 1;

      const offset = (commentPage - 1) * 3;
      const limit = 3;

      //pega repositorio de comentários
      const commentsRepository = MysqlDataSource.getRepository(Comments);

      //find nos 3 comentários mais recentes do card em questão
      const comments = await commentsRepository
        .createQueryBuilder('comments')
        .leftJoinAndSelect('comments.user', 'user')
        .where(
          'comments.category = :category AND comments.categoryId = :categoryId',
          { category, categoryId }
        )
        .orderBy('comments.createdAt', 'DESC')
        .skip(offset)
        .take(limit)
        .getMany();

      if (comments.length === 0) {
        return res.status(404).send({
          date: new Date(),
          status: false,
          data: 'Página não encontrada.'
        });
      }

      //adicionar parametro userComment nos objetos comments
      const commentsWithUserComment = comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        createdAt: comment.createdAt,
        categoryId: comment.categoryId,
        category: comment.category,
        userComment: comment.user.id === userId
      }));

      return res.status(200).json({
        date: new Date(),
        status: true,
        data: commentsWithUserComment
      });
    } catch (error) {
      console.log('Erro em getcomments: ', error);
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Um erro interno ocorreu.',
        error
      });
    }
  }
}
