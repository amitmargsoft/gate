import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gate_store')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  timestamp: number;

  @Column({
    nullable: true,
  })
  vehicle_type: string;

  @Column({
    nullable: true,
  })
  vehicle_no: string;

  @Column({
    nullable: true,
  })
  mineral_type: string;

  @Column({
    nullable: true,
  })
  mineral_type_confidence: string;

  @Column({
    nullable: true,
  })
  mi_start_time: string;
  @Column({
    nullable: true,
  })
  mi_end_time: string;

  @Column({
    nullable: true,
  })
  loaded_confidence: string;

  @Column({
    nullable: true,
  })
  overloading: string;

  @Column({
    nullable: true,
  })
  overloading_confidence: string;

  @Column({
    nullable: true,
  })
  covered: string;

  @Column({
    nullable: true,
  })
  covered_confidence: string;

  @Column({
    nullable: true,
  })
  lane: string;

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
  anpr_image_path: string;

  @Column({
    nullable: true,
  })
  anpr_video_path: string;

  @Column({
    nullable: true,
  })
  services: string;

  @Column({
    nullable: true,
  })
  inserted_at: number;

  @Column({
    nullable: true,
  })
  updated_at: number;

  @Column({
    nullable: true,
  })
  status: boolean;
}
