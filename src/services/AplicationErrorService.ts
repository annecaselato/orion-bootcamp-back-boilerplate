import { ApplicationErrorRepository } from '../repositories/aplicationErrorRepository';

/**
 * Service for handling application errors.
 */
export class ApplicationErrorService {
  /**
   * Saves an array of errors to the repository.
   * @param errors - An array of error objects. Each object should have a userId and an error object with name, message, and stack properties.
   * @returns Promise<void>
   */
  async create(errors: { userId: number; error: { name: string; message: string; stack: string } }[]): Promise<void> {
    await ApplicationErrorRepository.saveError(errors);
  }
}
