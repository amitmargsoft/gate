import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gate_rfid_data_store')
export class Tags {
  @PrimaryGeneratedColumn()
  seq_no: number;

  @Column({
    nullable: true,
  })
  tid: string;

  @Column({
    nullable: true,
  })
  vehicle_no: string;

  @Column({
    nullable: true,
  })
  db_match: string;

  @Column({
    nullable: true,
  })
  timestamp: number;

  @Column({
    nullable: true,
  })
  inserted_at: number;
}
