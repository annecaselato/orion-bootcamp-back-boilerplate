import { MysqlDataSource } from '../config/database';
import { Request, Response } from 'express';
import { Category } from '../utils/cardsMetricsUtils';
import { Comments } from '../entity/Comments';
import User from '../entity/User';

export class CommentController {
  /**
   * @swagger
   *
   * /v1/comments/{commentId}:
   *   delete:
   *
   *     summary: Deleta um comentário especificado
   *     description: Deleta o comentário especificado se ele pertencer ao usuário corrente
   *     security:
   *       - BearerAuth: []
   *     tags: [Comments]
   *     parameters:
   *       - in: path
   *         name: commentId
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: o ID do comentário
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
   *                 data: 'Comentário deletado com sucesso.'
   *       '400':
   *           description: 'Requisição malfeita.'
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
   *                 data: "ID de comentário inválido."
   *       '403':
   *           description: 'Operação não permitida.'
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
   *                 data: "O comentário pertence a outro usuário e não pode ser removido."
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
   *                 data: "Comentário não encontrado."
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
  async deleteComment(req: Request, res: Response) {
    try {
      const commentId: number = Number(req.params.comment_id);
      const user: User = req.body.user;

      //valida o parâmetro commentId recebido
      if (isNaN(commentId) || commentId <= 0) {
        return res.status(400).json({
          date: new Date(),
          status: false,
          data: 'ID de comentário inválido.'
        });
      }

      const commentsRepository = MysqlDataSource.getRepository(Comments);

      // encontra o comentário pelo id especificado
      const comment = await commentsRepository
        .createQueryBuilder('comments')
        .leftJoinAndSelect('comments.user', 'user')
        .where({
          id: commentId
        })
        .getOne();

      //verifica se o comentário foi encontrado
      if (!comment) {
        return res.status(404).json({
          date: new Date(),
          status: false,
          data: 'Comentário não encontrado.'
        });
      }

      //verifica se o comentário é do usuario atual
      if (comment.user.id !== user.id) {
        return res.status(403).json({
          date: new Date(),
          status: false,
          data: 'O comentário pertence a outro usuário e não pode ser removido.'
        });
      }

      // deleta comentário
      await commentsRepository.remove(comment);

      return res.status(200).json({
        date: new Date(),
        status: true,
        data: 'Comentário deletado com sucesso.'
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
