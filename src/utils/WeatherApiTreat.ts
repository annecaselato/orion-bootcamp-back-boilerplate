import ISolModified from '../interfaces/ISolModified';
import ISol from '../interfaces/ISol';

export default class WeatherApiTreat {
  public modifySolesKeys(solesInput: ISol[]): ISolModified[] {
    const solesOutput = solesInput.map(
      ({ sol, terrestrial_date, max_temp, min_temp }) => ({
        sol,
        terrestrial_date,
        max_temp,
        min_temp
      })
    );
    return solesOutput;
  }
}
