import ISol from '../interfaces/ISol';

export default class WeatherApiFilter {
  public filterSolesKeysBySignature(
    signature: string,
    solesInput: ISol[]
  ): ISol[] {
    const solesOutput = [];
    if (signature === 'basic') {
      solesInput.forEach(({ sol, max_temp, min_temp, terrestrial_date }) => {
        solesOutput.push({ sol, max_temp, min_temp, terrestrial_date });
      });
    } else {
      solesInput.forEach(
        ({
          sol,
          max_temp,
          min_temp,
          terrestrial_date,
          pressure,
          local_uv_irradiance_index,
          sunrise,
          sunset
        }) => {
          solesOutput.push({
            sol,
            max_temp,
            min_temp,
            terrestrial_date,
            pressure,
            local_uv_irradiance_index,
            sunrise,
            sunset
          });
        }
      );
    }
    return solesOutput;
  }
}
