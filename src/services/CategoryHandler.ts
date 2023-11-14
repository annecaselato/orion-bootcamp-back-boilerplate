import axios from 'axios';
import MarvelAPIParams from '../library/marvelAPIParamsInterface';
import * as marvelGetHelpers from '../utils/marvelGetHelpers';
import 'dotenv/config';

export default class CategoryHandler {
  async getElements(categoryAlias): Promise<unknown[]> {
    try {
      const timestamp = marvelGetHelpers.getTimestamp();
      const hash = await marvelGetHelpers.hashGenarator(timestamp);
      const limit = marvelGetHelpers.maxMarvelAPILimit(); // máximo definido pela API: 100
      const offset = marvelGetHelpers.offsetter();

      let dataArray: Array<unknown> = [];
      const categoryData: Array<unknown> = [];

      do {
        const response = await axios.get<MarvelAPIParams>(
          `${marvelGetHelpers.baseURL()}/${categoryAlias}`,
          {
            params: {
              offset: offset.next().value,
              limit: limit,
              ts: timestamp,
              apikey: process.env.MARVEL_API_KEY,
              modifiedSince: marvelGetHelpers.sevenDaysAgo(),
              hash: hash
            }
          }
        );

        dataArray = await response.data.data.results;
        categoryData.push(...dataArray);
      } while (dataArray.length);

      console.log(
        `${
          categoryData.length
        } dados modificados em '${categoryAlias}' desde ${marvelGetHelpers.sevenDaysAgo()}`
      );
      return categoryData;
    } catch (error) {
      console.error(error);
      return Promise.reject('Erro interno do servidor');
    }
  }
}
