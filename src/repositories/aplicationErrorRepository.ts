import { MysqlDataSource } from '../config/database';
import { ApplicationError } from '../entity/Logs';

/**
 * Repository for ApplicationError entity. Saves errors to database and lists errors for the errors endpoint.
 */
export class ApplicationErrorRepository {
  /**
   * saveError
   *
   * Saves each newError in the errors array to the database
   *
   * @param errors Array of "errors" from: ErrorController and ErrorService
   */
  public static async saveError(errors: { userId: number; error: { name: string; message: string; stack: string } }[]): Promise<void> {
    const errorRepository = MysqlDataSource.getRepository(ApplicationError);

    for (const newError of errors) {
      const errorEntity = new ApplicationError();
      errorEntity.userId = newError.userId;
      errorEntity.error = newError.error;
      await errorRepository.save(errorEntity);
    }
  }

  /**
   * listErrors
   *
   * Lists errors in descending order by createdAt.
   */
  public static async listErrors(): Promise<ApplicationError[]> {
    return MysqlDataSource.getRepository(ApplicationError).find({
      order: { createdAt: 'DESC' }
    });
  }
}
