import { MysqlDataSource } from '../config/database';
import { Sol } from '../entity/Sol';
import { DeepPartial } from 'typeorm';

/**
 * Repository for Sol entity. Saves soles to database and lists soles for the soles endpoint.
 */
export class SolRepository {
  /**
   * save14MarsDays
   *
   * Saves each newSol in the soles array is saved to the database, in case it's not already there
   *
   * @param soles Array of "soles" from: SolController and NasaService
   */
  public static async save14MarsDays(soles: DeepPartial<Sol[]>): Promise<void> {
    const solRepository = MysqlDataSource.getRepository(Sol);
    const allSols: Sol[] = await solRepository.find();

    for (const newSol of soles) {
      const repeatedSol: DeepPartial<Sol> = allSols.find((sol) => sol.solNumberMarsDay === newSol.solNumberMarsDay);
      if (!repeatedSol) {
        await solRepository.save(soles);
      }
    }
  }

  /**
   * listSoles
   *
   * Lists soles in descending order and limited to 14 items.
   */
  public static async listSoles(): Promise<Sol[]> {
    return MysqlDataSource.getRepository(Sol).find({
      order: { solNumberMarsDay: 'DESC' },
      take: 14
    });
  }
}
