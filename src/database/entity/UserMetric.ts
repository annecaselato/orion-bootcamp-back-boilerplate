import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Metric } from '../../models/enumMetrics';

@Entity()
export class Metrics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Metric
  })
  metric: string;

  @Column()
  quantity: number;
}
