import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Metrics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metric: string;

  @Column()
  quantity: number;
}
