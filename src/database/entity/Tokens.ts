import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Tokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
}
