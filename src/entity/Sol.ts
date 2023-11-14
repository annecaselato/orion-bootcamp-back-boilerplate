import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'soles' })
export class Sol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  solNumberMarsDay: number;

  @Column()
  terrestrialDate: Date;

  @Column()
  maximumTemperature: number;

  @Column()
  minimumTemperature: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
