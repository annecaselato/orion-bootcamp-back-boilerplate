import User from '../entity/User';
import { MysqlDataSource } from '../config/database';
import TotalRegistrations from '../entity/TotalUserRegister';

export class TotalRegisterService {
  private static totalRegistrationsRepository =
    MysqlDataSource.getRepository(TotalRegistrations);
  private static userRepository = MysqlDataSource.getRepository(User);

  static async totalRegisterService(): Promise<void> {
    const repository = this.totalRegistrationsRepository;
    const existingRecord = await repository.findOne({
      where: { id: 1 }
    });

    if (existingRecord) {
      this.updateExistingRecord(existingRecord);
    } else {
      const newRecord = this.createRecord();
      await repository.save(newRecord);
    }

    // Verificar e atualizar o número total de usuários registrados
    const totalUsers = await this.totalUsersDatabase();
    if (existingRecord && existingRecord.totalRegistrations !== totalUsers) {
      existingRecord.totalRegistrations = totalUsers;
      await repository.save(existingRecord);
    }
    // Verificar e atualizar o banco com o número total de usuários ativos
    const activateUsers = await this.totalUsersActiveDatabase();
    if (
      existingRecord &&
      existingRecord.activeRegistrations !== activateUsers
    ) {
      existingRecord.activeRegistrations = activateUsers;
      await repository.save(existingRecord);
    }

    // Verificar e atualizar o banco com o número total de usuários inativos
    const inactivateUsers = await this.totalUsersInactiveDatabase();
    if (
      existingRecord &&
      existingRecord.inactiveRegistrations !== inactivateUsers
    ) {
      existingRecord.inactiveRegistrations = inactivateUsers;
      await repository.save(existingRecord);
    }
  }

  private static async totalUsersDatabase(): Promise<number> {
    const usersRepository = this.userRepository;
    const totalUsers = await usersRepository.count();
    return totalUsers;
  }

  private static totalUsersActiveDatabase(): Promise<number> {
    const usersRepository = this.userRepository;
    const activateUsers = usersRepository.count({
      where: { isActivated: true }
    });
    return activateUsers;
  }

  private static totalUsersInactiveDatabase(): Promise<number> {
    const usersRepository = this.userRepository;
    const inactivateUsers = usersRepository.count({
      where: { isActivated: false }
    });
    return inactivateUsers;
  }

  private static updateExistingRecord(record: TotalRegistrations) {
    record.totalRegistrations += 1;
    record.inactiveRegistrations += 1;
    this.totalRegistrationsRepository.save(record);
  }

  private static createRecord(): TotalRegistrations {
    const newRecord = new TotalRegistrations();
    newRecord.totalRegistrations = 1;
    newRecord.inactiveRegistrations = 1;
    return newRecord;
  }

  static async updateActiveUsers(): Promise<void> {
    const repository = this.totalRegistrationsRepository;
    const existingTotalRegistrations = await repository.findOne({
      where: { id: 1 }
    });

    if (existingTotalRegistrations) {
      existingTotalRegistrations.activeRegistrations += 1;
      existingTotalRegistrations.inactiveRegistrations -= 1;
      await repository.save(existingTotalRegistrations);
    }
  }
}
