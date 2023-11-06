import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import MarvelAPIParams from '../library/marvelAPIParamsInterface';
import * as marvelGetHelpers from '../library/marvelGetHelpers';

export default class CharactersMiddleware {
  async getCharacters(
    req: Request,
    res: Response,
    page: number = 1,
    next: NextFunction
  ): Promise<void> {
    try {
      const timestamp = marvelGetHelpers.getTimestamp();
      const hash = await marvelGetHelpers.hashGenarator(timestamp);
      const validPage = Math.min(marvelGetHelpers.maximunValidPage(), page); // evita retornar array vazio
      const offset = (validPage - 1) * marvelGetHelpers.cardsPerPage(); // se page === 1, offset = 0

      const limit = Math.min(
        marvelGetHelpers.maxMarvelAPILimit(),
        validPage * marvelGetHelpers.cardsPerPage()
      ); // limit pode ser até o valor máximo definido pela API (100)

      const response = await axios.get<MarvelAPIParams>(
        `${marvelGetHelpers.baseURL()}/characters`,
        {
          params: {
            offset: offset,
            limit: limit,
            ts: timestamp,
            apikey: process.env.MARVEL_API_KEY,
            hash: hash
          }
        }
      );
      //res.json(response.data);
      const charactersData = await response.data.data.results;
      res.locals.charactersData = charactersData;

      next();
    } catch (error) {
      console.error(error);

      res.status(500).json({
        date: new Date(),
        status: false,
        data: 'Erro interno do servidor'
      });
    }
  }
}
