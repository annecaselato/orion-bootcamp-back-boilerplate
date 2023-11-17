import axios from 'axios';
import ISol from '../interfaces/ISol';

export class NasaApi {
  public async getSolesInWeatherApi(): Promise<ISol[]> {
    const JSO = await axios.get(process.env.MARTE_API);
    const soles = JSO.data.soles;
    const theMostRecentSevenSoles = soles.slice(0, 7);
    return theMostRecentSevenSoles;
  }
}
