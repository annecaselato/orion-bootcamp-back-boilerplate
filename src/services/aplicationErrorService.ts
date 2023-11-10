import { ApplicationErrorRepository } from '../repositories/aplicationErrorRepository';

export class ApplicationErrorService {
  async create(errors: { userId: number; error: { name: string; message: string; stack: string } }[]) {
    await ApplicationErrorRepository.saveError(errors);
  }

  async getAll() {
    return await ApplicationErrorRepository.listErrors();
  }
}
