import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

/**
 * Entidade com informações relacionadas a séries da Marvel
 */
@Entity('series')
export default class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  idMarvel: number;

  @Column({ type: 'varchar', length: 256 })
  enTitle: string;

  @Column({ type: 'varchar', length: 256, default: null })
  ptTitle: string;

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