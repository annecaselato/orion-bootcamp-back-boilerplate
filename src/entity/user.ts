import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Gender } from '../lib/genderTypes';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'enum', enum: Gender }) // Atribuir enum direto ??
  gender: Gender;

  @Column()
  birth_date: Date;

  @Column({ type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, select: false }) // VERIFICAR SE RETORNA QUANDO PRECISAR VALIDAR O SELECT
  password: string;

  @Column({ update: false })
  created_at: Date;

  @BeforeInsert()
  createdAtDate() {
    this.created_at = new Date();
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
