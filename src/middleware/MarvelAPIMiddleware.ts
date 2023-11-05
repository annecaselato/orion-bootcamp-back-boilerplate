import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import MarvelCharactersProperties from '../library/charactersPropertiesInterface';
import MarvelAPIParams from '../library/marvelAPIParamsInterface';
import * as marvelGetDefinitions from '../library/marvelGetDefinitions';
import * as marvelGetHelpers from '../library/utilityFunctions';

export default class MarvelAPIMiddleware {
  async getCharacters(
    req: Request,
    res: Response,
    page: number = 1,
    next: NextFunction
  ): Promise<void> {
    try {
      const timestamp = marvelGetDefinitions.getTimestamp();
      const hash = await marvelGetHelpers.hashGenarator(timestamp);
      const validPage = Math.min(marvelGetDefinitions.maximunValidPage(), page); // evita retornar array vazio
      const offset = (validPage - 1) * marvelGetDefinitions.cardsPerPage(); // se page === 1, offset = 0

      const limit = Math.min(
        marvelGetDefinitions.maxMarvelAPILimit(),
        validPage * marvelGetDefinitions.cardsPerPage()
      ); // limit pode ser até o valor máximo definido pela API (100)

      const response = await axios.get<MarvelAPIParams>(
        `${marvelGetDefinitions.baseURL()}/characters`,
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
      const characterData: Array<MarvelCharactersProperties> =
        await response.data.data.results;

      const characters: Array<MarvelCharactersProperties> =
        marvelGetHelpers.extractWantedData(characterData);

      const originalCharactersFiletered = characters;
      res.locals.originalCharactersFiletered = originalCharactersFiletered;

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
