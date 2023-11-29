import { Metric } from '../../models/enumMetrics';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique
} from 'typeorm';

@Entity()
@Unique(['metric'])
export class Metrics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Metric
  })
  metric: Metric;

  @Column()
  quantity: number;
}
