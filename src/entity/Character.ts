import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  en_name: string;

  @Column({ type: 'varchar', length: 128 })
  pt_name: string;

  @Column({ type: 'varchar', length: 2048 })
  description: string;

  @Column({ type: 'varchar', length: 256 })
  thumb: string;
}
