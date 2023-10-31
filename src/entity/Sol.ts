import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sol' })
export class Sol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sol: number;

  @Column()
  max_temp: number;

  @Column()
  min_temp: number;
}
