import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

/**
 * Entidade com informações relacionadas a artistas parceiros
 */
@Entity('artists')
export default class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  registeredAt: Date;

  @Column({ type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  fullName: string;

  @Column({ type: 'varchar', length: 1024 })
  interestOrigin: string;

  @Column({ type: 'varchar', length: 256 })
  experience: string;

  @Column({ type: 'varchar', length: 256 })
  artAsIncome: string;

  @Column({ type: 'varchar', length: 1024 })
  portfolio: string;

  @Column({ type: 'int' })
  artsPerMonth: number;

  @Column({ type: 'varchar', length: 256 })
  artSampleURL: string;

  @Column({ type: 'varchar', length: 30 })
  number: string;
}
