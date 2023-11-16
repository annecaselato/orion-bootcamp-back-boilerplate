import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

/**
 * Entidade com informações relacionadas a personagens da Marvel
 */
@Entity('characters')
export default class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  idMarvel: number;

  @Column({ type: 'varchar', length: 128 })
  enName: string;

  @Column({ type: 'varchar', length: 128, default: null })
  ptName: string;

  @Column({ type: 'varchar', length: 2048, default: null })
  description: string;

  @Column({ type: 'varchar', length: 256, default: null })
  thumb: string;

  @Column({ default: false })
  isTranslated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdate: Date;
}
