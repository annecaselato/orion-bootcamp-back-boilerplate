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

  @Column()
  metric: string;

  @Column()
  quantity: number;
}
