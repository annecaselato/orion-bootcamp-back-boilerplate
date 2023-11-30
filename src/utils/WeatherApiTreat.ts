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

  private translateMarsUVIrradiance(marsUVIrradiance: string): string {
    const radiation = marsUVIrradiance.toLowerCase();
    const radiationLevel = {
      low: 'Baixa',
      moderate: 'Moderada',
      high: 'Alta',
      very_high: 'Muito alta'
    };
    return radiationLevel[radiation];
  }

  public modifySolesKeys(solesInput: ISol[]): ISolModified[] {
    const solesOutput = solesInput.map(
      ({
        sol,
        terrestrial_date,
        max_temp,
        min_temp,
        local_uv_irradiance_index,
        pressure,
        sunset,
        sunrise
      }) => ({
        sol,
        terrestrial_date: this.modifyTerrestrialDate(terrestrial_date),
        max_temp,
        min_temp,
        mars_uv: this.translateMarsUVIrradiance(local_uv_irradiance_index),
        pressure,
        sunset,
        sunrise
      })
    );
    return solesOutput;
  }
}
