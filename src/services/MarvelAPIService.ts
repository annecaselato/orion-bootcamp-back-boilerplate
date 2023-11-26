import axios from 'axios';
import MarvelParamsDefinition from '../utils/MarvelParamsDefinition';

export default class MarvelAPIService {
  async getElements(categoryAlias): Promise<unknown[]> {
    try {
      let dataArray: Array<unknown> = [];
      const categoryData: Array<unknown> = [];
      const paramsDefiner = new MarvelParamsDefinition();
      const timeStamp = paramsDefiner.getTimestamp();
      const offset = paramsDefiner.offsetter();
      const daysInterval = 7;
      do {
        const response = await axios.get(
          `${paramsDefiner.baseURL()}/${categoryAlias}`,
          {
            params: {
              offset: offset.next().value,
              limit: paramsDefiner.maxMarvelAPILimit(),
              ts: timeStamp,
              apikey: paramsDefiner.apikey(),
              //modifiedSince: paramsDefiner.modifiedsSince(daysInterval),
              hash: paramsDefiner.hashGenarator(timeStamp)
            }
          }
        );
        dataArray = await response.data.data.results;
        categoryData.push(...dataArray);
      } while (dataArray.length > 100);
      return categoryData;
    } catch (error) {
      console.error(error);
      return Promise.reject('Erro interno do servidor');
    }
  }
}
