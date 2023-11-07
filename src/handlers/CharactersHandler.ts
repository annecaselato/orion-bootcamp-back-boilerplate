import axios from 'axios';
import MarvelCharactersProperties from '../library/charactersPropertiesInterface';
import MarvelAPIParams from '../library/marvelAPIParamsInterface';
import * as marvelGetHelpers from '../utils/marvelGetHelpers';

export default class CharactersHandler {
  async getCharacters(): Promise<MarvelCharactersProperties[]> {
    try {
      const page: number = marvelGetHelpers.initialPage();
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
      const charactersData: Array<MarvelCharactersProperties> =
        await response.data.data.results;
      return charactersData;
    } catch (error) {
      console.error(error);
      return Promise.reject('Erro interno do servidor');
    }
  }
}
