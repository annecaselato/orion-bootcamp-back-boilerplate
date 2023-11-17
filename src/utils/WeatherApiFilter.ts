import ISol from '../interfaces/ISol';

export default class WeatherApiFilter {
  public filterSolesKeysBySignature(solesInput: ISol[]): ISol[] {
    const solesOutput = [];
    solesInput.forEach(({ sol, terrestrial_date, max_temp, min_temp }) => {
      solesOutput.push({ sol, terrestrial_date, max_temp, min_temp });
    });
    return solesOutput;
  }
}
