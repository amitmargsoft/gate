import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gate_anpr_data_store')
export class Anpr {
  @PrimaryGeneratedColumn()
  seq_no: any;

  @Column({
    nullable: true,
  })
  anpr_id: any;

  @Column({
    nullable: true,
  })
  device_id: any;

  @Column({
    nullable: true,
  })
  match_type: any;

  @Column({
    nullable: true,
  })
  direction: any;

  @Column({
    nullable: true,
  })
  priority: any;

  @Column({
    nullable: true,
  })
  wait_time: any;

  @Column({
    nullable: true,
  })
  make: any;

  @Column({
    nullable: true,
  })
  aux_lp: any;

  @Column({
    nullable: true,
  })
  det_confidence: any;

  @Column({
    nullable: true,
  })
  confidence: any;

  @Column({
    nullable: true,
  })
  anpr_video_path: any;

  @Column({
    nullable: true,
  })
  anpr_image_path: any;

  @Column({
    nullable: true,
  })
  vf_image_path: any;

  @Column({
    nullable: true,
  })
  vf_video_path: any;

  @Column({
    nullable: true,
  })
  db_match: any;

  @Column({
    nullable: true,
  })
  event_timestamp: any;

  @Column({
    nullable: true,
  })
  inserted_at: any;
}
