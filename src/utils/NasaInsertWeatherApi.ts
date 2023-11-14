import axios from 'axios';

export class NasaApi {
  async insertWeatherApi() {
    const JSO = await axios.get(
      'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
    );
    const sols = JSO.data.soles.filter(
      ({ sol }) =>
        sol == 259 ||
        sol == 260 ||
        sol == 261 ||
        sol == 262 ||
        sol == 267 ||
        sol == 268 ||
        sol == 269
    );
    return sols;
  }
}
