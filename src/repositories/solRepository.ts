import { MysqlDataSource } from '../config/database';
import { Sol } from '../entity/Sol';

export class SolRepository {
  /**
   *Saves each newSol in the soles array is saved to the database, in case it's not already there
   * @param soles Array of "soles" from: SolController and NasaService
   */
  public static async Save14MarsDays(soles: Sol[]): Promise<void> {
    const solRepository = MysqlDataSource.getRepository(Sol);

    const allSols: Sol[] = await solRepository.find();

    for (const newSol of soles) {
      const repeatedSol: Sol = allSols.find((sol) => sol.solNumberMarsDay === newSol.solNumberMarsDay);

      if (!repeatedSol) {
        await solRepository.save(newSol);
      }
    }
  }
}
