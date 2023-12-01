import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

  /**
   * Entidade com informações relacionadas a comentários
   */
  @Entity('comments')
  export default class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 1024 })
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;

  }