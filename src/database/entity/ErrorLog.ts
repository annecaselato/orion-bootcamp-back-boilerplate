import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class ErrorLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateErro: Date;

  @Column()
  errorDescription: string;
}
