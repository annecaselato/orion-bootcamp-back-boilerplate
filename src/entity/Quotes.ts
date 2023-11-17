import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'quotes' })
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  quote: string;

  @CreateDateColumn()
  created_at: Date;
}
