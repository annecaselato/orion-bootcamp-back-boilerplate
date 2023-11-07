import { Request, Response } from 'express';
import { User } from '../entity/User';
import { MysqlDataSource } from '../config/database';
import { Character } from '../entity/Character';
import { Metrics } from '../entity/Metrics';

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

        //find no personagem
        const character: Character = await characterRepository.findOne({
          where: {
            id: character_id
          }
        });

        //cria nova métrica na tabela
        const metricsEntry = new Metrics();
        metricsEntry.user = user;
        metricsEntry.character = character;
        metricsEntry.clicks = 1;

        await MysqlDataSource.manager.save(metricsEntry);
      }

      res
        .status(200)
        .send({
          date: new Date(),
          status: false,
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
