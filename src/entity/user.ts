import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivated: boolean;
}
