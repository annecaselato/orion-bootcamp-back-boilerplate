import { MysqlDataSource } from '../config/database';
import { Sol } from '../entity/Sol';

export class SolRepository {
  public static async Save14MarsDays(soles: Sol[]): Promise<void> {
    const solRepository = MysqlDataSource.getRepository(Sol);
    const allSols: Sol[] = await solRepository.find();

    for (const existingSol of allSols) {
      const repeatedSol = soles.find((sol) => sol.solNumberMarsDay === existingSol.solNumberMarsDay);

      if (repeatedSol) {
        await solRepository.remove(existingSol);
      }
    }

    for (const newSol of soles) {
      const existingSol = allSols.find((sol) => sol.solNumberMarsDay === newSol.solNumberMarsDay);

      if (existingSol) {
        await solRepository.save(existingSol);
      } else {
        await solRepository.save(newSol);
      }
    }
  }
}
