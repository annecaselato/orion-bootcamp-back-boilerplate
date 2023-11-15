import axios from 'axios';
import ISol from '../interfaces/solInterface';

export class NasaApi {
  async insertWeatherApi(): Promise<ISol[]> {
    const JSO = await axios.get(
      'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
    );
    const soles = JSO.data.soles;
    const theMostRecentSevenSoles = soles.slice(0, 7);
    return theMostRecentSevenSoles;
  }
}
