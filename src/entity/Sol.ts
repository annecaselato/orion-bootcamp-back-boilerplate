import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'soles' })
export class Sol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  solNumberMarsDay: number;

  @Column()
  maximumTemperature: number;

  @Column()
  minimumTemperature: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
