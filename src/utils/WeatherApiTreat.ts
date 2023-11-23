import ISolModified from '../interfaces/ISolModified';
import ISol from '../interfaces/ISol';

export default class WeatherApiTreat {
  private modifyTerrestrialDate(date: Date): string {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    const numberDay = date[8] !== '0' ? `${date[8]}${date[9]}` : date[9];
    const monthIndex = date[5] !== '0' ? `${date[5]}${date[6]}` : date[6];
    return `${numberDay} ${months[Number(monthIndex) - 1]}`;
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
