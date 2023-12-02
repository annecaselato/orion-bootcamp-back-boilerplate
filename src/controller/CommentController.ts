import { MysqlDataSource } from '../config/database';
import User from '../entity/User';
import { Request, Response } from 'express';
import { Category } from '../utils/cardsMetricsUtils';
import CommentRepository from '../repository/CommentRepository';
import { CommentValidator } from '../validator/commentValidator';

export class CommentsController {
  /**
   * @swagger
   * /v1/comments/{category}/{categoryId}:
   *   post:
   *     summary: Cria um novo comentário
   *     description: Cria um novo comentário em uma categoria e um item específico.
   *     security:
   *       - BearerAuth: []
   *     tags: [Comments]
   *     parameters:
   *       - in: path
   *         name: category
   *         required: true
   *         description: A categoria do comentário (comics, series, stories, events)
   *         schema:
   *           type: string
   *       - in: path
   *         name: categoryId
   *         required: true
   *         description: O ID da categoria
   *         schema:
   *           type: integer
   *     requestBody:
   *       description: Dados do comentário
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               comment:
   *                 type: string
   *                 example: Um comentário bem legal!
   *     responses:
   *       '200':
   *         description: Comentário criado com sucesso
   *         content:
   *           application/json:
   *             example:
   *               date: 2023-12-01T12:34:56.789Z
   *               status: true
   *               data: Comentário criado com sucesso!
   *       '400':
   *         description: Requisição inválida devido a parâmetros ausentes ou inválidos
   *         content:
   *           application/json:
   *             example:
   *               date: 2023-12-01T12:34:56.789Z
   *               status: false
   *               data: Ocorreu um erro ao encontrar o usuário.
   *       '500':
   *         description: Ocorreu um erro interno do servidor
   *         content:
   *           application/json:
   *             example:
   *               date: 2023-12-01T12:34:56.789Z
   *               status: false
   *               data: Ocorreu um erro interno ao criar o comentário, tente novamente.
   */
  async createComment(req: Request, res: Response) {
    try {
      const { category, categoryId } = req.params;
      const user_id: number = req.body.user.id;
      const comment = req.body.comment;
      const userRepository = MysqlDataSource.getRepository(User);
      const commentRepository = new CommentRepository();

      const user = await userRepository.findOne({ where: { id: user_id } });

      if (!user) {
        return res.status(400).send({
          date: new Date(),
          status: false,
          data: 'Ocorreu um erro ao encontrar o usuário.'
        });
      }

      if (!Object.values(Category).includes(category as Category)) {
        return res.status(400).send({
          date: new Date(),
          status: false,
          data: 'Categoria inválida.'
        });
      }
      const bannedWords = CommentValidator.getBannedWords();

      if (CommentValidator.containsBannedWords(comment, bannedWords)) {
        return res.status(400).send({
          date: new Date(),
          status: false,
          data: 'O comentário contém palavras impróprias.'
        });
      }

      const newComment = await commentRepository.createAndSave({
        user: user.id,
        category: category,
        categoryId: categoryId,
        comment: comment
      });

      return res.status(200).send({
        date: new Date(),
        status: true,
        data: 'Comentário criado com sucesso!'
      });
    } catch (err) {
      return res.status(500).send({
        date: new Date(),
        status: false,
        data: 'Ocorreu um erro interno do servidor.'
      });
    }
  }
}
