import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ApplicationError {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column('json', { nullable: true })
  error: object;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;
}
