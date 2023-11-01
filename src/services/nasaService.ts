import axios from 'axios';
import { Sol } from '../entity/Sol';

interface SolMars {
  id: string;
  terrestrial_date: string;
  sol: string;
  ls: string;
  season: string;
  min_temp: string;
  max_temp: string;
  pressure: string;
  pressure_string: string;
  abs_humidity: string;
  wind_speed: string;
  wind_direction: string;
  atmo_opacity: string;
  sunrise: string;
  sunset: string;
  local_uv_irradiance_index: string;
  min_gts_temp: string;
  max_gts_temp: string;
}

export class NasaService {
  private URL: string = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';

  private async fetchDataFromNasaApi(): Promise<SolMars[] | string> {
    try {
      const response = await axios.get(this.URL);
      return response.data.soles;
    } catch (error) {
      throw new Error('Erro na solicitação à API: ' + error.message);
    }
  }

  private async selectAndSaveSolesInfo(fourteenSoles: SolMars[]): Promise<Sol[]> {
    const fourteenSolesData: Sol[] = [];
    fourteenSoles.forEach((sol) => {
      const temporarySol: Sol = new Sol();
      temporarySol.solNumberMarsDay = parseInt(sol.sol);
      temporarySol.maximumTemperature = parseInt(sol.max_temp);
      temporarySol.minimumTemperature = parseInt(sol.min_temp);

      fourteenSolesData.push(temporarySol);
    });

    const topFourteenSoles = fourteenSolesData.slice(0, 14);

    return topFourteenSoles;
  }

  public async getFirstFourteenSoles(): Promise<Sol[]> {
    const soles = await this.fetchDataFromNasaApi();

    if (typeof soles === 'string') {
      throw new Error('Erro na solicitação à API: ' + soles);
    } else {
      const firstFourteen = soles.slice(0, 14);
      return this.selectAndSaveSolesInfo(firstFourteen);
    }
  }
}
