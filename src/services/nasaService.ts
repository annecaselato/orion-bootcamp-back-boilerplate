import axios from 'axios';
import { Sol } from '../entity/Sol';
import { DeepPartial } from 'typeorm';

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

/**
 * Service for fetching and processing data from the NASA API related to Mars weather.
 */
export class NasaService {
  private URL: string = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';

  /**
   * fetchDataFromNasaApi
   *
   * Fetches soles array from the NASA API.
   *
   * @returns {Promise<SolMars[] | string>} In case of success, returns an array with the data.
   *   Otherwise, it returns a string with the error message.
   */
  private async fetchDataFromNasaApi(): Promise<SolMars[] | string> {
    try {
      const response = await axios.get(this.URL);
      return response.data.soles;
    } catch (error) {
      return 'Erro na solicitação à API: ' + error.message;
    }
  }

  /**
   * selectAndSaveSolesInfo
   *
   * From all data fetched from the NASA API, it instantiates 14 of those "sols",
   * which are mars days.
   *
   * @param fourteenSoles Array of 14 soles from API.
   * @returns {Promise<Sol[]>} Array of soles that will later be used to update
   *  the soles table in the database. See solRepository.
   */
  private async selectAndSaveSolesInfo(fourteenSoles: SolMars[]): Promise<DeepPartial<Sol[]>> {
    const fourteenSolesData: DeepPartial<Sol[]> = fourteenSoles.map((sol) => {
      const dateParts = sol.terrestrial_date.split('-');
      return {
        solNumberMarsDay: parseInt(sol.sol),
        terrestrialDate: new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`),
        maximumTemperature: parseInt(sol.max_temp),
        minimumTemperature: parseInt(sol.min_temp)
      };
    });
    return fourteenSolesData;
  }

  /**
   * getFirstFourteenSoles
   *
   * This functions is called in the SolController and it calls 2 other methods in this class.
   * First it calls the method that fetches data from the NASA API.
   * Secondly, it saves the data to the database.
   *
   * @returns {Promise<Sol[]>} Array of soles that will later be used to update
   *  the soles table in the database. See solRepository.
   */
  public async getFirstFourteenSoles(): Promise<DeepPartial<Sol[]>> {
    const soles = await this.fetchDataFromNasaApi();

    return typeof soles === 'string' ? [] : this.selectAndSaveSolesInfo(soles.slice(0, 14));
  }
}
