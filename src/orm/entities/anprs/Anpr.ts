import moment from 'moment-timezone';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('gate_anpr_data_store')
export class Anpr {
  @PrimaryGeneratedColumn()
  seq_no: number;

  @Column({
    nullable: true,
  })
  anpr_id: string;

  @Column({
    nullable: true,
  })
  device_id: string;

  @Column({
    nullable: true,
  })
  match_type: string;

  @Column({
    nullable: true,
  })
  direction: string;

  @Column({
    nullable: true,
  })
  priority: string;

  @Column({
    nullable: true,
  })
  wait_time: string;

  @Column({
    nullable: true,
  })
  make: string;

  @Column({
    nullable: true,
  })
  aux_lp: string;

  @Column({
    nullable: true,
  })
  det_confidence: string;

  @Column({
    nullable: true,
  })
  confidence: string;

  @Column({
    nullable: true,
  })
  anpr_video_path: string;

  @Column({
    nullable: true,
  })
  anpr_image_path: string;

  @Column({
    nullable: true,
  })
  vf_image_path: string;

  @Column({
    nullable: true,
  })
  vf_video_path: string;

  @Column({
    nullable: true,
  })
  db_match: string;

  @Column({
    nullable: true,
  })
  event_timestamp: string;

  @Column({
    nullable: true,
  })
  inserted_at: number;
}
