import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import User from './User';

export default class UserSatisfaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, default: null })
  comment: string;

  @Column({ type: 'int', nullable: false })
  grade: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  date: Date;
}
