import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

/**
 * Entidade com informações relacionadas a personagens da Marvel
 */
@Entity('characters')
export default class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
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

  @Column({ update: false })
  createdAt: Date;

  @Column()
  lastUpdate: Date;

  @BeforeInsert()
  createdAtDate() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.lastUpdate = new Date();
  }
}
