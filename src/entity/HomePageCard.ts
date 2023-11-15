import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class HomePageCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  HomePageCardTitle: string;

  @Column()
  HomePageCardImage: string;

  @Column()
  HomePageCardDescription: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
