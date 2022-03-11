import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('gate_rfid_status')
export class Anpr {
  @PrimaryGeneratedColumn()
  seq_no: number;

  @Column()
  case_id: string;

  @Column()
  tag_send: string;

  @Column()
  tag_removed: string;

  @Column()
  inserted_at: number;
}
