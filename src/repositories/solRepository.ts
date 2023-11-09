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
   * Finds most recently saved Sol (latestSavedSol) and then saves only those in the
   * api response with sol number (solNumberMarsDay) greater than the most recent one in the database
   *
   * @param soles Array of "soles" from: SolController and NasaService
   */
  public static async save14MarsDays(soles: DeepPartial<Sol[]>): Promise<void> {
    const solRepository = MysqlDataSource.getRepository(Sol);

    const { latestSavedSol } = await solRepository
      .createQueryBuilder('Sol')
      .select('MAX(Sol.solNumberMarsDay)', 'latestSavedSol')
      .getRawOne();

    const solsToSave = soles.filter((newSol) => newSol.solNumberMarsDay > latestSavedSol);

    if (solsToSave.length > 0) {
      await solRepository.save(solsToSave);
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
