import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Metrics } from '../database/entity/UserMetric';

export class UserMetricsService {
  private metricRepository: Repository<Metrics>;

  constructor() {
    this.metricRepository = MysqlDataSource.getRepository(Metrics);
  }

  async findByMetric(
    metric: 'Registrations Incompleted' | 'Registrations Started'
  ): Promise<Metrics | undefined> {
    return await this.metricRepository.findOne({ where: { metric } });
  }

  async updateRegSta(
    metric: 'Registrations Started'
  ): Promise<void | undefined> {
    const regSta = await this.metricRepository.findOne({ where: { metric } });
    if (regSta) {
      regSta.quantity = regSta.quantity + 1;
      this.metricRepository.save(regSta);
    }
  }

  async updateRegInc(
    metric: 'Registrations Incompleted'
  ): Promise<void | undefined> {
    const regSta = await this.metricRepository.findOne({
      where: {
        metric: 'Registrations Started'
      }
    });
    const regCom = await this.metricRepository.findOne({
      where: {
        metric: 'Registrations Completed'
      }
    });
    const regInc = await this.metricRepository.findOne({ where: { metric } });

    if (!regInc) {
      return undefined;
    }
    if (regInc) {
      regInc.quantity = regSta.quantity - regCom.quantity;
      this.metricRepository.save(regInc);
    }
  }
}
