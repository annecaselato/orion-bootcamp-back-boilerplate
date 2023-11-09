import axios from 'axios';
import MarvelAPIParams from '../library/marvelAPIParamsInterface';
import * as marvelGetHelpers from '../utils/marvelGetHelpers';

export default class CharactersHandler {
  async getCharacters(offset) {
    try {
      const timestamp = marvelGetHelpers.getTimestamp();
      const hash = await marvelGetHelpers.hashGenarator(timestamp);
      const limit = marvelGetHelpers.maxMarvelAPILimit(); // valor máximo definido pela API (100)

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
      const charactersData: Array<unknown> = await response.data.data.results;
      return charactersData;
    } catch (error) {
      console.error(error);
      return Promise.reject('Erro interno do servidor');
    }
  }
}
