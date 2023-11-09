import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comics')
export class Comic {
  @PrimaryGeneratedColumn()
  id: number;
}
