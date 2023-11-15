import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'planCards' })
export class PlanCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  planCardTitle: string;

  @Column()
  planCardDescription: string;

  @Column()
  planCardImage: string;

  @Column()
  planCardButtonText: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
