import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
