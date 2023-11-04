import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import md5 from 'md5';
import MarvelCharactersProperties from '../library/charactersPropertiesInterface';
import MarvelAPIParams from '../library/marvelApiParamsInterface';
import * as marvelGetDefinitions from '../library/marvelGetDefinitions';

export default class MarvelAPIHandler {
  private hashGenarator = async (): Promise<string> => {
    return md5(
      marvelGetDefinitions.timestamp +
        process.env.MARVEL_PRIVATE_KEY +
        process.env.MARVEL_API_KEY
    );
  };

  async getCharacters(
    req: Request,
    res: Response,
    next: NextFunction,
    page: number = 1
  ): Promise<void> {
    const hash = await this.hashGenarator();
    try {
      const validPage = Math.min(marvelGetDefinitions.maximunValidPage(), page); // evita retornar array vazio
      const offset = (validPage - 1) * marvelGetDefinitions.cardsPerPage(); // se page === 1, offset = 0
      const limit = Math.min(
        marvelGetDefinitions.maxMarvelAPILimit(),
        validPage * marvelGetDefinitions.cardsPerPage()
      ); // valor máximo de 100 no limit

      const response = await axios.get<MarvelAPIParams>(
        `${marvelGetDefinitions.baseURL()}/characters`,
        {
          params: {
            offset: offset,
            limit: limit,
            ts: marvelGetDefinitions.timestamp,
            apikey: process.env.MARVEL_API_KEY,
            hash: hash
          }
        }
      );

      //res.json(response.data);
      const characterData: Array<MarvelCharactersProperties> =
        await response.data.data.results;

      const filteredData = this.filterWantedData(characterData);

      module.exports = function (
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        return filteredData;
      };
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

  private filterWantedData(characterers: Array<MarvelCharactersProperties>) {
    const charactersFiltered: Array<MarvelCharactersProperties> =
      characterers.map((character): MarvelCharactersProperties => {
        const characterName = character.name;
        const characterDescription = character.description;
        const characterThumb = character.thumbnail;
        return {
          name: characterName,
          description: characterDescription,
          thumbnail: characterThumb
        };
      });
  }
}
