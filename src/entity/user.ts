import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72 })
  password: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 30 }) // deveria ser number ?
  gender: string;

  @Column()
  birth_date: Date;

  @Column({ update: false })
  created_at: Date;

  @BeforeInsert()
  createdAtDate() {
    this.created_at = new Date();
    this.last_update = new Date();
  }

  @Column()
  last_update: Date;

  @BeforeUpdate()
  updateDates() {
    this.last_update = new Date();
  }

  @Column({ default: false })
  isActivated: boolean;
}
