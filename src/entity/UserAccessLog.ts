import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  BeforeInsert
} from 'typeorm';

import User from './User';

/**
 * Entidade com informações relacionadas ao registro de acessos (logins bem-sucedidos) de usuários
 */
@Entity('user_access_log')
export default class UserAccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ update: false })
  accessDate: Date;

  @BeforeInsert()
  accessedAtDate() {
    this.accessDate = new Date();
  }
}
