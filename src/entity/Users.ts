import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

import { BcryptUtils } from '../library/bcryptUtils';

import { userRoles } from '../constants/userRoles';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: userRoles['Free'] })
  role: string;

  @Column({ nullable: true })
  passwordRecoveryToken: string;

  @Column({ nullable: true })
  accessToken: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await BcryptUtils.hashPassword(this.password);
    }
  }
}
