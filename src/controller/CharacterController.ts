import { Request, Response } from 'express';
import { MysqlDataSource } from '../config/database';
import { Character } from '../entity/Character';

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
