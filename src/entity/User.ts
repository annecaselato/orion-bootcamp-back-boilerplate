import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  gender: string;

  @Column()
  birthDate: Date;

  @Column({ type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;

  @Column({ update: false })
  createdAt: Date;

  @BeforeInsert()
  createdAtDate() {
    this.createdAt = new Date();
  }

  @Column()
  lastUpdate: Date;

  @BeforeUpdate()
  updateDates() {
    this.lastUpdate = new Date();
  }

  @Column({ default: false })
  isActivated: boolean;
}