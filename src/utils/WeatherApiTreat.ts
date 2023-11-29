import ISolModified from '../interfaces/ISolModified';
import ISol from '../interfaces/ISol';

export default class WeatherApiTreat {
  private modifyTerrestrialDate(date: Date): string {
    const data = new Date(date);
    const formattedData = data.toLocaleString('pt-BR', {
      month: 'long',
      day: 'numeric'
    });
    return formattedData;
  }

  public modifySolesKeys(solesInput: ISol[]): ISolModified[] {
    const solesOutput = solesInput.map(
      ({ sol, terrestrial_date, max_temp, min_temp }) => ({
        sol,
        terrestrial_date: this.modifyTerrestrialDate(terrestrial_date),
        max_temp,
        min_temp
      })
    );
    return solesOutput;
  }
}
