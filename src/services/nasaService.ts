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
  private URL: string;

  constructor(URL: string) {
    this.URL = URL;
  }

  private async fetchDataFromNasaApi(): Promise<SolMars[] | string> {
    try {
      const response = await axios.get(this.URL);
      return response.data.soles;
    } catch (error) {
      throw new Error('Erro na solicitação à API: ' + error.message);
    }
  }

  private async selectSolesInfo(fourteenSoles: SolMars[]): Promise<Sol[]> {
    const fourteenSolesData = [];
    fourteenSoles.forEach((sol) => {
      const tempSol: Sol = new Sol();
      tempSol.sol = Number(sol.sol);
      tempSol.max_temp = Number(sol.max_temp);
      tempSol.min_temp = Number(sol.min_temp);
      fourteenSolesData.push(tempSol);
    });
    return fourteenSolesData;
  }

  public async getFirstFourteenSoles(): Promise<Sol[]> {
    const soles = await this.fetchDataFromNasaApi();

    if (typeof soles === 'string') {
      throw new Error('Erro na solicitação à API: ' + soles);
    }

    const firstFourteen = soles.slice(0, 14);
    return this.selectSolesInfo(firstFourteen);
  }
}
