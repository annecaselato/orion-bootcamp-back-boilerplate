import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  idMarvel: number;

  @Column({ type: 'varchar', length: 128 })
  enName: string;

  @Column({ type: 'varchar', length: 128, default: null })
  ptName: string;

  @Column({ type: 'varchar', length: 2048 })
  description: string;

  @Column({ type: 'varchar', length: 256 })
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
    this.lastUpdate = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.lastUpdate = new Date();
  }
}
